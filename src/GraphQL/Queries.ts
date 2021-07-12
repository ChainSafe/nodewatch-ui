import { gql } from "apollo-boost"

export const LOAD_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      id
      firstName
      email
      password
    }
  }
`
