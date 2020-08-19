import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
// import router from "./routers/index"

import { graphqlHTTP } from 'express-graphql'
import graphqlSchema from './graphql/schema'
import graphqlResovers from './graphql/resolvers'

const app = express()

app.use(express.json())
app.use(cookieParser())
// app.use("/", router)

app.use('/graphql', cors(), graphqlHTTP({
  schema: graphqlSchema,
  rootValue: graphqlResovers,
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