import React, { useState, useEffect } from "react"
import { GraphQLClient } from "graphql-request"
import { GetAllUsers } from "../GraphQL/types/getAllUsers"
import { LOAD_USERS } from "../GraphQL/Queries"

type Eth2CrawlerContextProps = {
  children: React.ReactNode | React.ReactNode[]
}

interface IEth2CrawlerContext {
  users: any[]
}

const Eth2CrawlerContext = React.createContext<IEth2CrawlerContext | undefined>(undefined)

const subgraphUrl = process.env.REACT_APP_GRAPHQL_URL || ""
const graphClient = new GraphQLClient(subgraphUrl)

const Eth2CrawlerProvider = ({ children }: Eth2CrawlerContextProps) => {
  const [users, setUsers] = useState([])

  const getUsers = async () => {
    const result = await graphClient.request<GetAllUsers>(LOAD_USERS)
    console.log(result.getAllUsers)
  }

  useEffect(() => {
    getUsers()
    setUsers([])
  }, [])

  return (
    <Eth2CrawlerContext.Provider
      value={{
        users,
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
