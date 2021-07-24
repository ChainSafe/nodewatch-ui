/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
export type ClientType = "geth" | "parity" | "ethereumjs" | "getc" | "nethermind" | "multigeth"

export type NetworkType = "mainnet" | "classic" | "ropsten" | "rinkeby" | "kovan" | "goerli"

export interface NodeInfo {
  name: string
  weight: number
  client: ClientType
  coordinates: [number, number]
}
