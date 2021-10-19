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
  LOAD_NODE_COUNTS,
  LOAD_NODE_COUNT_OVER_TIME,
  LOAD_REGIONAL_STATS,
  LOAD_NODES_BY_COUNTRIES,
  LOAD_ALTAIR_UPGRADE_PERCENTAGE,
} from "../GraphQL/Queries"
import { GetNodeStats, GetNodeStats_getNodeStats } from "../GraphQL/types/GetNodeStats"
import {
  GetNodeStatsOverTime,
  GetNodeStatsOverTime_getNodeStatsOverTime,
} from "../GraphQL/types/GetNodeStatsOverTime"
import { getUnixTimeStampCurrent, getUnixTimeStampFromDaysBefore } from "../utils/dateUtils"
import {
  GetRegionalStats,
  GetRegionalStats_getRegionalStats,
} from "../GraphQL/types/getRegionalStats"
import {
  GetNodesByCountries,
  GetNodesByCountries_aggregateByCountry,
} from "../GraphQL/types/GetNodesByCountries"
import { GetAltAirUpgradePercentage } from "../GraphQL/types/GetAltAirUpgradePercentage"

type Eth2CrawlerContextProps = {
  children: React.ReactNode | React.ReactNode[]
}

interface IEth2CrawlerContext {
  clients: GetClientCounts_aggregateByAgentName[]
  operatingSystems: GetOperatingSystems_aggregateByOperatingSystem[]
  networks: GetNetworks_aggregateByNetwork[]
  clientVersions: GetClientVersions_aggregateByClientVersion[]
  heatmap: GetHeatmap_getHeatmapData[]
  nodeStats: GetNodeStats_getNodeStats | undefined
  nodeStatsOverTime: GetNodeStatsOverTime_getNodeStatsOverTime[]
  nodeRegionalStats: GetRegionalStats_getRegionalStats | undefined
  nodeCountByCountries: GetNodesByCountries_aggregateByCountry[]
  altAirPercentage: number | undefined
  isLoadingClients: boolean
  isLoadingOperatingSystems: boolean
  isLoadingNetworks: boolean
  isLoadingHeatmap: boolean
  isLoadingClientVersions: boolean
  isLoadingNodeStats: boolean
  isLoadingNodeStatsOverTime: boolean
  isLoadingNodeRegionalStats: boolean
  isLoadingNodeCountByCountries: boolean
  isLoadingAltAirPercentage: boolean
}

const Eth2CrawlerContext = React.createContext<IEth2CrawlerContext | undefined>(undefined)

const subgraphUrl = process.env.REACT_APP_GRAPHQL_URL || ""
const graphClient = new GraphQLClient(subgraphUrl)

const Eth2CrawlerProvider = ({ children }: Eth2CrawlerContextProps) => {
  const [nodeStats, setNodeStats] = useState<GetNodeStats_getNodeStats | undefined>(undefined)
  const [nodeRegionalStats, setNodeRegionalStats] = useState<
    GetRegionalStats_getRegionalStats | undefined
  >(undefined)
  const [nodeStatsOverTime, setNodeStatsOverTime] = useState<
    GetNodeStatsOverTime_getNodeStatsOverTime[]
  >([])
  const [clients, setClients] = useState<GetClientCounts_aggregateByAgentName[]>([])
  const [operatingSystems, setOperatingSystems] = useState<
    GetOperatingSystems_aggregateByOperatingSystem[]
  >([])
  const [networks, setNetworks] = useState<GetNetworks_aggregateByNetwork[]>([])
  const [clientVersions, setClientVersions] = useState<
    GetClientVersions_aggregateByClientVersion[]
  >([])
  const [heatmap, setHeatmap] = useState<GetHeatmap_getHeatmapData[]>([])
  const [nodeCountByCountries, setNodeCountByCountries] = useState<
    GetNodesByCountries_aggregateByCountry[]
  >([])
  const [altAirPercentage, setAltAirPercentage] = useState<number | undefined>(undefined)

  const [isLoadingClients, setIsLoadingClients] = useState(true)
  const [isLoadingOperatingSystems, setIsLoadingOperatingSystems] = useState(true)
  const [isLoadingNetworks, setIsLoadingNetworks] = useState(true)
  const [isLoadingHeatmap, setIsLoadingHeatmap] = useState(true)
  const [isLoadingClientVersions, setIsLoadingClientVersions] = useState(true)
  const [isLoadingNodeStats, setIsLoadingNodeStats] = useState(true)
  const [isLoadingNodeStatsOverTime, setIsLoadingNodeStatsOverTime] = useState(true)
  const [isLoadingNodeRegionalStats, setIsLoadingNodeRegionalStats] = useState(true)
  const [isLoadingNodeCountByCountries, setIsLoadingNodeCountByCountries] = useState(true)
  const [isLoadingAltAirPercentage, setIsLoadingAltAirPercentage] = useState(true)

  const getInitialData = async () => {
    graphClient
      .request<GetNodeStats>(LOAD_NODE_COUNTS, {
        percentage: 15,
      })
      .then((result) => {
        setNodeStats(result.getNodeStats)
      })
      .catch(console.error)
      .finally(() => setIsLoadingNodeStats(false))
    graphClient
      .request<GetNodeStatsOverTime>(LOAD_NODE_COUNT_OVER_TIME, {
        start: getUnixTimeStampFromDaysBefore(7),
        end: getUnixTimeStampCurrent(),
      })
      .then((result) => {
        setNodeStatsOverTime(result.getNodeStatsOverTime)
      })
      .catch(console.error)
      .finally(() => setIsLoadingNodeStatsOverTime(false))
    graphClient
      .request<GetRegionalStats>(LOAD_REGIONAL_STATS)
      .then((result) => {
        setNodeRegionalStats(result.getRegionalStats)
      })
      .catch(console.error)
      .finally(() => setIsLoadingNodeRegionalStats(false))
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
    graphClient
      .request<GetNodesByCountries>(LOAD_NODES_BY_COUNTRIES)
      .then((result) => {
        setNodeCountByCountries(result.aggregateByCountry)
      })
      .catch(console.error)
      .finally(() => setIsLoadingNodeCountByCountries(false))
    graphClient
      .request<GetAltAirUpgradePercentage>(LOAD_ALTAIR_UPGRADE_PERCENTAGE)
      .then((result) => {
        setAltAirPercentage(result.getAltairUpgradePercentage)
      })
      .catch(console.error)
      .finally(() => setIsLoadingAltAirPercentage(false))
  }

  useEffect(() => {
    getInitialData()
  }, [])

  return (
    <Eth2CrawlerContext.Provider
      value={{
        nodeStats,
        nodeStatsOverTime,
        nodeRegionalStats,
        clients,
        operatingSystems,
        networks,
        heatmap,
        nodeCountByCountries,
        clientVersions,
        altAirPercentage,
        isLoadingNodeStats,
        isLoadingClients,
        isLoadingOperatingSystems,
        isLoadingNetworks,
        isLoadingHeatmap,
        isLoadingClientVersions,
        isLoadingNodeStatsOverTime,
        isLoadingNodeRegionalStats,
        isLoadingNodeCountByCountries,
        isLoadingAltAirPercentage,
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
