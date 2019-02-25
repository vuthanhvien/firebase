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
    // await getData.then(data => {
    //     console.log(data);
    //     schemaData = JSON.parse(JSON.stringify(data));
    // })

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

    return graphQLServer(requests, response)
})




export const getSchema = functions.https.onRequest(async (req, res) => {
    const cors = require('cors')({ origin: true });
    let out;

    // await getData.then(data => {
    //     console.log(data);
    //     out = data;


    // }).catch(err => console.log(err))

    await firebase.database().ref('schema/').once('value', (snapshot) => {
        const data = snapshot.val();
        out = data
    });

    return cors(req, res, () => {
        res.send(JSON.stringify(out));
    });
    // return
});

exports.showEvent = functions.https.onRequest((req, res) => {
    const params = req.url.split("/");
    const eventId = params[2];
    console.log('eventId', eventId)
    return firebase.database().ref('schema/' + eventId).once('value', (snapshot) => {
        const event = snapshot.val();
        console.log('event', event)
        res.send(`
            <!doctype html>
            <html>
                <head>
                    <title>${event.name}</title>
                </head>
                <body>
                    <h1>Title ${event.name} in ${event.city}</h1>
                </body>
            </html>`
        );
    });
});