/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
import React, { useState, useEffect } from "react"
import { GraphQLClient } from "graphql-request"
import {
  GetClientCounts,
  GetClientCounts_aggregateByAgentName,
} from "../GraphQL/types/GetClientCounts"
import {
  GetOperatingSystems,
  GetOperatingSystems_aggregateByOperatingSystem,
} from "../GraphQL/types/GetOperatingSystems"
import { GetNetworks, GetNetworks_aggregateByNetwork } from "../GraphQL/types/GetNetworks"
import { GetHeatmap, GetHeatmap_getHeatmapData } from "../GraphQL/types/GetHeatmap"
import {
  GetClientVersions,
  GetClientVersions_aggregateByClientVersion,
} from "../GraphQL/types/GetClientVersions"
import {
  LOAD_CLIENTS,
  LOAD_NETWORKS,
  LOAD_OPERATING_SYSTEMS,
  LOAD_HEATMAP,
  LOAD_CLIENT_VERSIONS,
} from "../GraphQL/Queries"

type Eth2CrawlerContextProps = {
  children: React.ReactNode | React.ReactNode[]
}

interface IEth2CrawlerContext {
  clients: GetClientCounts_aggregateByAgentName[]
  operatingSystems: GetOperatingSystems_aggregateByOperatingSystem[]
  networks: GetNetworks_aggregateByNetwork[]
  clientVersions: GetClientVersions_aggregateByClientVersion[]
  heatmap: GetHeatmap_getHeatmapData[]
  isLoadingClients: boolean
  isLoadingOperatingSystems: boolean
  isLoadingNetworks: boolean
  isLoadingHeatmap: boolean
  isLoadingClientVersions: boolean
}

const Eth2CrawlerContext = React.createContext<IEth2CrawlerContext | undefined>(undefined)

const subgraphUrl = process.env.REACT_APP_GRAPHQL_URL || ""
const graphClient = new GraphQLClient(subgraphUrl)

const Eth2CrawlerProvider = ({ children }: Eth2CrawlerContextProps) => {
  const [clients, setClients] = useState<GetClientCounts_aggregateByAgentName[]>([])
  const [operatingSystems, setOperatingSystems] = useState<
    GetOperatingSystems_aggregateByOperatingSystem[]
  >([])
  const [networks, setNetworks] = useState<GetNetworks_aggregateByNetwork[]>([])
  const [clientVersions, setClientVersions] = useState<
    GetClientVersions_aggregateByClientVersion[]
  >([])
  const [heatmap, setHeatmap] = useState<GetHeatmap_getHeatmapData[]>([])

  const [isLoadingClients, setIsLoadingClients] = useState(true)
  const [isLoadingOperatingSystems, setIsLoadingOperatingSystems] = useState(true)
  const [isLoadingNetworks, setIsLoadingNetworks] = useState(true)
  const [isLoadingHeatmap, setIsLoadingHeatmap] = useState(true)
  const [isLoadingClientVersions, setIsLoadingClientVersions] = useState(true)

  const getInitialData = async () => {
    graphClient
      .request<GetClientCounts>(LOAD_CLIENTS)
      .then((result) => {
        setClients(result.aggregateByAgentName)
      })
      .catch(console.error)
      .finally(() => setIsLoadingClients(false))
    graphClient
      .request<GetOperatingSystems>(LOAD_OPERATING_SYSTEMS)
      .then((result) => {
        setOperatingSystems(result.aggregateByOperatingSystem)
      })
      .catch(console.error)
      .finally(() => setIsLoadingOperatingSystems(false))
    graphClient
      .request<GetNetworks>(LOAD_NETWORKS)
      .then((result) => {
        setNetworks(result.aggregateByNetwork)
      })
      .catch(console.error)
      .finally(() => setIsLoadingNetworks(false))
    graphClient
      .request<GetHeatmap>(LOAD_HEATMAP)
      .then((result) => {
        setHeatmap(result.getHeatmapData)
      })
      .catch(console.error)
      .finally(() => setIsLoadingHeatmap(false))
    graphClient
      .request<GetClientVersions>(LOAD_CLIENT_VERSIONS)
      .then((result) => {
        setClientVersions(result.aggregateByClientVersion)
      })
      .catch(console.error)
      .finally(() => setIsLoadingClientVersions(false))
  }

  useEffect(() => {
    getInitialData()
  }, [])

  return (
    <Eth2CrawlerContext.Provider
      value={{
        clients,
        operatingSystems,
        networks,
        heatmap,
        clientVersions,
        isLoadingClients,
        isLoadingOperatingSystems,
        isLoadingNetworks,
        isLoadingHeatmap,
        isLoadingClientVersions,
      }}
    >
      {children}
    </Eth2CrawlerContext.Provider>
  )
}

const useEth2CrawlerApi = () => {
  const context = React.useContext(Eth2CrawlerContext)
  if (context === undefined) {
    throw new Error("useEth2CrawlerApi must be used within a Eth2CrawlerProvider")
  }
  return context
}

export { Eth2CrawlerProvider, useEth2CrawlerApi }
