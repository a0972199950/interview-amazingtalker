import { gql } from '~/server/util/graphqlHelper'
import * as profileSchema from '~/server/schema/profile'

const typeDefs = [
  gql`
    type Query {}
    type Mutation {}
  `,
  profileSchema.typeDefs
]

const resolvers = [
  {
    Query: {},
    Mutation: {}
  },
  profileSchema.resolvers
]

export {
  typeDefs,
  resolvers
}