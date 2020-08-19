import { buildSchema } from 'graphql'

const gql = (strs: TemplateStringsArray) => {
  return buildSchema(strs.raw[0])
}

export { gql }