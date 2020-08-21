import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { graphqlHTTP } from 'express-graphql'
import { typeDefs, resolvers } from '~/server/schema/index'

const app = express()

app.use(express.json())
app.use(cookieParser())

// const schema = gql`
//   type Query {
//     hello: String
//   }
// `

// const resolvers = {
//   hello () {
//     return 'Hello world!'
//   }
// }

app.use('/graphql', cors(), graphqlHTTP({
  schema: typeDefs[0],
  rootValue: resolvers,
  graphiql: true,
  formatError (e) {
    if (!e.originalError) { return e }

    return {
      message: e.message,
      data: e.originalError.data
    }
  }
}))



export default { path: '/api', handler: app }