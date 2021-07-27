/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
import { gql } from "apollo-boost"

export const LOAD_CLIENTS = gql`
  query GetClientCounts {
    aggregateByAgentName {
      name
      count
    }
  }
`

export const LOAD_OPERATING_SYSTEMS = gql`
  query GetOperatingSystems {
    aggregateByOperatingSystem {
      name
      count
    }
  }
`

export const LOAD_NETWORKS = gql`
  query GetNetworks {
    aggregateByNetwork {
      name
      count
    }
  }
`
