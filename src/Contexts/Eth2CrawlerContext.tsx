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
  LOAD_CLIENTS,
  LOAD_NETWORKS,
  LOAD_OPERATING_SYSTEMS,
  LOAD_HEATMAP,
} from "../GraphQL/Queries"

type Eth2CrawlerContextProps = {
  children: React.ReactNode | React.ReactNode[]
}

interface IEth2CrawlerContext {
  clients: GetClientCounts_aggregateByAgentName[]
  operatingSystems: GetOperatingSystems_aggregateByOperatingSystem[]
  networks: GetNetworks_aggregateByNetwork[]
  heatmap: GetHeatmap_getHeatmapData[]
  isLoadingClients: boolean
  isLoadingOperatingSystems: boolean
  isLoadingNetworks: boolean
  isLoadingHeatmap: boolean
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
  const [heatmap, setHeatmap] = useState<GetHeatmap_getHeatmapData[]>([])

  const [isLoadingClients, setIsLoadingClients] = useState(true)
  const [isLoadingOperatingSystems, setIsLoadingOperatingSystems] = useState(true)
  const [isLoadingNetworks, setIsLoadingNetworks] = useState(true)
  const [isLoadingHeatmap, setIsLoadingHeatmap] = useState(true)

  const getInitialData = async () => {
    graphClient
      .request<GetClientCounts>(LOAD_CLIENTS)
      .then((result) => {
        setClients(result.aggregateByAgentName)
      })
      .finally(() => setIsLoadingClients(false))
    graphClient
      .request<GetOperatingSystems>(LOAD_OPERATING_SYSTEMS)
      .then((result) => {
        setOperatingSystems(result.aggregateByOperatingSystem)
      })
      .finally(() => setIsLoadingOperatingSystems(false))
    graphClient
      .request<GetNetworks>(LOAD_NETWORKS)
      .then((result) => {
        setNetworks(result.aggregateByNetwork)
      })
      .finally(() => setIsLoadingNetworks(false))
    graphClient
      .request<GetHeatmap>(LOAD_HEATMAP)
      .then((result) => {
        setHeatmap(result.getHeatmapData)
      })
      .finally(() => setIsLoadingHeatmap(false))
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
        isLoadingClients,
        isLoadingOperatingSystems,
        isLoadingNetworks,
        isLoadingHeatmap,
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
