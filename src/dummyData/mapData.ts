export type NetworkType = "geth" | "parity" | "ethereumjs" | "getc" | "nethermind" | "multigeth"

export const nodeLocations: {
  name: string
  weight: number
  network: NetworkType
  coordinates: [number, number]
}[] = [
  {
    name: "california",
    weight: 100,
    network: "geth",
    coordinates: [37.1930977, -123.7969029],
  },
  {
    name: "tokyo",
    weight: 30,
    network: "getc",
    coordinates: [35.5090627, 139.2093774],
  },
  {
    name: "johannesburg",
    weight: 50,
    network: "ethereumjs",
    coordinates: [-26.1713505, 27.9699847],
  },
  {
    name: "madrid",
    weight: 40,
    network: "multigeth",
    coordinates: [40.4381311, -3.8196201],
  },
  {
    name: "dhaka",
    weight: 70,
    network: "parity",
    coordinates: [23.7807777, 90.3492856],
  },
]
