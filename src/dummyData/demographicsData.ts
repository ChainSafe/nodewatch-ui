/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
import { ClientType } from "../types/main"

export const clients: {
  client: ClientType
  total: number
}[] = [
  {
    client: "geth",
    total: 23,
  },
  {
    client: "parity",
    total: 80,
  },
  {
    client: "getc",
    total: 30,
  },
  {
    client: "ethereumjs",
    total: 40,
  },
  {
    client: "multigeth",
    total: 50,
  },
]
