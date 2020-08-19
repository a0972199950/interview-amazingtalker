<template>
  <div>
    {{ data }}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { request, gql } from 'graphql-request'

@Component
export default class PGraphql extends Vue {
  data: any = 'data'

  async created () {
    try {
      const email = 'john@gmail.com'

      const { createUser } = await request('/api/graphql', gql`
        mutation {
          createUser(userInput: {
            email: "${email}",
            name: "John",
            password: "123456"
          }) {
            _id, email, name
          }
        }
      `)

      // const { data: { createUser } } = await this.$axios.$post('/api/graphql', {
      //   query: `
      //     mutation {
      //       createUser(userInput: {
      //         email: "john@gmail.com",
      //         name: "John",
      //         password: "123456"
      //       }) {
      //         _id, email, name
      //       }
      //     }
      //   `
      // })

      this.data = createUser
    } catch (e) {
      console.log(e)
    }
  }
}
</script>
