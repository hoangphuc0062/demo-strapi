const LOGIN_MUTATION = `
  mutation Login($input: UsersPermissionsLoginInput!) {
    login(input: $input) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`

const REGISTER_MUTATION = `
  mutation Register($input: UsersPermissionsRegisterInput!) {
    register(input: $input) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`

const ME_QUERY = `
 query Me {
  me {
    id
    documentId
    username
    email
    confirmed
    blocked
    role {
    id
    name
    }
  }
}
`



export { LOGIN_MUTATION, REGISTER_MUTATION, ME_QUERY }