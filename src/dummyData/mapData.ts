/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
import { NodeInfo } from "../types/main"

export const nodeLocations: NodeInfo[] = [
  {
    name: "california",
    weight: 100,
    client: "geth",
    coordinates: [37.1930977, -123.7969029],
  },
  {
    name: "tokyo",
    weight: 30,
    client: "getc",
    coordinates: [35.5090627, 139.2093774],
  },
  {
    name: "johannesburg",
    weight: 50,
    client: "ethereumjs",
    coordinates: [-26.1713505, 27.9699847],
  },
  {
    name: "madrid",
    weight: 40,
    client: "multigeth",
    coordinates: [40.4381311, -3.8196201],
  },
  {
    name: "dhaka",
    weight: 70,
    client: "parity",
    coordinates: [23.7807777, 90.3492856],
  },
]
