export type ClientType = "geth" | "parity" | "ethereumjs" | "getc" | "nethermind" | "multigeth"

export type NetworkType = "mainnet" | "classic" | "ropsten" | "rinkeby" | "kovan" | "goerli"

export interface NodeInfo {
  name: string
  weight: number
  client: ClientType
  coordinates: [number, number]
}
