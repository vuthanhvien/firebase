import { makeExecutableSchema } from "graphql-tools"

import resolvers from "./resolvers"


import schemaArray from './config';

let schema = `
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
`

schemaArray.map(item => {
	schema +=`type ${item.name} implements Node {
		`;
		item.children.map(key=>{
			schema +=`	${key.name}: ${key.type}
			`
		})
	schema +=`}
	`;
})

schema+=`type Query {
	`
schemaArray.map(item => {
	schema+=`	${item.name.toLowerCase()}s: [${item.name}]
	`
	schema+=`	${item.name.toLowerCase()}(id: String!): ${item.name}
	`
	
})

schema+=`}
`

// type Author implements Node {
// 	id: String! 
// 	firstName: String
// 	lastName: String
// 	posts: [Post] 
//   }

//   type Post implements Node {
// 	id: String!
// 	title: String
// 	author: Author
// 	votes: Int
//   }


// type Query {
// 	posts: [Post]
// 	authors: [Author]
//   }



export default makeExecutableSchema({
	typeDefs: schema,
	resolvers,
	resolverValidationOptions: {
		requireResolversForResolveType: false
	},
})