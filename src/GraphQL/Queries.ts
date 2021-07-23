/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
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
