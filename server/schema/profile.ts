import { gql } from '~/server/util/graphqlHelper'

const typeDefs = gql`
  type Profile {
    locale: String
    timezone: String
  }

  extend type Query {
    profile: Profile
  }
`

const resolvers = {
  profile () {
    return {
      locale: 'zh-TW',
      timezone: 'Asia'
    }
  }
}

export {
  typeDefs,
  resolvers
}