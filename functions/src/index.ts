import { https } from "firebase-functions"
// import { getData } from './config';
import * as bodyParser from "body-parser"
import * as express from "express"
import { graphqlExpress, graphiqlExpress } from "graphql-server-express"
import { printSchema } from "graphql/utilities/schemaPrinter"
import { makeExecutableSchema } from "graphql-tools"
import makeresolvers from './resolvers';

import * as firebase from 'firebase-admin'
firebase.initializeApp()

const getData = new Promise((resolve, reject) => {
    firebase.firestore().collection('schema').onSnapshot((snapshot) => {
        const out: any = {};
        snapshot.forEach(doc => {
            // const post = doc.data();
            // const postTmp: any = {}

            // Object.keys(post).map(key => {
            //     postTmp.key = key;
            //     postTmp.type = post[key];
            // })
            out[doc.id] = doc.data()

        });
        resolve(out)
    })
})

// const getData = firebase.firestore().doc('schema').get();

export const api = https.onRequest(async (request, response) => {
    let schemaData;
    await getData.then(data => {
        schemaData = JSON.parse(JSON.stringify(data));
    })
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
        schemaString += `	${item.name.toLowerCase()}s: [${item.name}]
	`
        schemaString += `	${item.name.toLowerCase()}(id: String!): ${item.name}
	`

    })

    schemaString += `}
`

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

    return graphQLServer(request, response)
})




export const getSchema = https.onRequest((req, res) => {
    const cors = require('cors')({ origin: true });
    let out;

    getData.then(data => {
        out = data;
        cors(req, res, () => {
            res.send(JSON.stringify(out));
        });

    }).catch(err => console.log(err))
    // return
});