/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
import { gql } from "apollo-boost"

export const LOAD_NODE_COUNTS = gql`
  query GetNodeStats($percentage: Int!) {
    getNodeStats(unsyncedPercentage: $percentage) {
      totalNodes
      nodeSyncedPercentage
      nodeUnsyncedPercentage
    }
  }
`

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

export const LOAD_HEATMAP = gql`
  query GetHeatmap {
    getHeatmapData {
      networkType
      clientType
      syncStatus
      latitude
      longitude
    }
  }
`

export const LOAD_CLIENT_VERSIONS = gql`
  query GetClientVersions {
    aggregateByClientVersion {
      client
      count
      versions {
        name
        count
      }
    }
  }
`
