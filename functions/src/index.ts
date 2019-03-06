import * as functions from "firebase-functions"
// import { getData } from './config';
import * as bodyParser from "body-parser"
import * as express from "express"
import { graphqlExpress, graphiqlExpress } from "graphql-server-express"
import { printSchema } from "graphql/utilities/schemaPrinter"
import { makeExecutableSchema } from "graphql-tools"
import makeresolvers from './resolvers';
import axios from 'axios';

import * as firebase from 'firebase-admin'
firebase.initializeApp()

const getData = new Promise((resolve, reject) => {
    const projectId = firebase.instanceId().app.options.projectId
    const url = "https://" + projectId + ".firebaseio.com/schema.json";
    console.log(url)
    axios.get(url).then((res) => {
        if (res) { resolve(res.data) }
    }).catch((err) => console.log(err))

})

// const getData = firebase.firestore().doc('schema').get();

export const api = functions.https.onRequest(async (requests, response) => {
    let schemaData;
    await firebase.database().ref('schema/').once('value', (snapshot) => {
        const data = snapshot.val();
        schemaData = data
    });

    let schemaString = `
    scalar Json

    interface Node {
        id: String!
    }

    type Pagination {
        page: Int
        list: [Node]
        totalCount: Int
    }
    type Payload {
        success: Boolean
        message: String
    }


    type Mutation {
        createOne(model: String, data: Json) : Payload
        updateOne(model: String, data: Json) : Payload
        deleteOne(model: String, id: String) : Payload
    }
  `;

    const schemaArray = [];
    Object.keys(schemaData).map(key => {
        const children = [];
        Object.keys(schemaData[key]).map(item => {
            children.push(
                { name: item, type: schemaData[key][item] }
            )
        })
        schemaArray.push({
            name: key,
            children: children
        })
    })


    schemaArray.map(item => {
        schemaString += `type ${item.name} implements Node {
		`;
        item.children.map(key => {
            schemaString += `	${key.name}: ${key.type}
			`
        })
        schemaString += `}
	`;
    })

    schemaString += `type Query {
	`
    schemaArray.map(item => {
        schemaString += `	${item.name.toLowerCase()}s(where: Json, limit: Int, skip: Int, orderBy: String): Pagination${item.name}
	`
        schemaString += `	${item.name.toLowerCase()}(id: String!): ${item.name}
	`
    })


    schemaString += `}
    `
    schemaArray.map(item => {
        schemaString += `type Pagination${item.name}{
            skip: Int
            limit: Int
            list: [${item.name}]
            total: Int
            orderBy: String
        }
        `
    })


    const resolvers = makeresolvers(schemaArray, firebase)
    // const resolvers;
    const schema = makeExecutableSchema({
        typeDefs: schemaString,
        resolvers,
        resolverValidationOptions: {
            requireResolversForResolveType: false
        },
    })

    // setup server
    const graphQLServer = express()
    const cors = require('cors')({
        origin: true,
    });
    graphQLServer.use(cors);
    // /api/graphql
    graphQLServer.use(
        "/graphql",
        bodyParser.json(),
        graphqlExpress({ schema, context: {} })
    )

    // /api/graphiql
    graphQLServer.use(
        "/graphiql",
        graphiqlExpress({ endpointURL: "/api/graphql" })
    )

    // /api/schema
    graphQLServer.use("/schema", (req, res) => {
        console.log(req);
        res.set("Content-Type", "text/plain")
        res.send(printSchema(schema))
    })

    return graphQLServer(requests, response)
})




export const getSchema = functions.https.onRequest(async (req, res) => {
    const cors = require('cors')({ origin: true });
    await firebase.database().ref('schema/').once('value', (snapshot) => {
        const data = snapshot.val();
        return cors(req, res, () => {
            res.send(JSON.stringify(data));
        });
    });
});


export const setSchema = functions.https.onRequest(async (req, res) => {
    const name = req.params.name;
    const data = JSON.parse(req.params.data);
    console.log(data, name)
    const cors = require('cors')({ origin: true });
    await firebase.database().ref('schema/' + name).set(data).then(response => {
        console.log(response)
        res.send(JSON.stringify({ success: true, msg: 'Successfully' }))
    })
});





export const land = functions.https.onRequest((r, ee) => {

    const { Nuxt } = require('nuxt')
    const app = express()
    const config = {
        dev: false,
        buildDir: 'nuxtDist',
        build: {
            publicPath: '/land/'
        }
    }
    const nuxt = new Nuxt(config)

    const handleRequest = (req, res) => {
        res.set('Cache-Control', 'public, max-age=600, s-maxage=1200')
        nuxt.renderRoute('/').then(result => {
            res.send('result.html')
        }).catch(e => {
            res.send(e)
        })
    }
    app.get('*', handleRequest)

});