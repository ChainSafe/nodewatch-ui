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
