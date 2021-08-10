/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
import React from "react"
import { createStyles, makeStyles, useTheme } from "@chainsafe/common-theme"
import { Typography } from "@chainsafe/common-components"
import { ResponsiveContainer, BarChart, Bar, XAxis, CartesianGrid, YAxis } from "recharts"
import { useEth2CrawlerApi } from "../../../Contexts/Eth2CrawlerContext"
import { ECTheme } from "../../Themes/types"

const useStyles = makeStyles(({ palette, constants }: ECTheme) => {
  return createStyles({
    root: {
      border: `1px solid ${palette.additional["gray"][4]}`,
      borderRadius: "3px",
      padding: constants.generalUnit * 2,
    },
    title: {
      marginBottom: constants.generalUnit,
    },
    item: {
      background: "#fafafa",
      borderRadius: "8px",
    }
  })
})

  const data = [
  {
    name: "Geth",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000
  }
];

const colorUv = () => {
  <defs>
  <linearGradient
    id="colorUv"
    x1="0"
    y1="0"
    x2="0"
    y2="100%"
    gradientUnits="userSpaceOnUse"
  >
    <stop offset="0" stopColor="red" />
    <stop offset=".5" stopColor="yellow" />
    <stop offset="1" stopColor="green" />
  </linearGradient>
</defs>
}

const ClientTypes1 = () => {
  const classes = useStyles()
  const theme: ECTheme = useTheme()

  let { clients } = useEth2CrawlerApi()

  clients = clients.sort((first, second) => (first.count < second.count ? 1 : -1))
  clients = clients.slice(0,6)

  const barLabels = clients.map((client) => client.name)
  const barData = clients.map((client) => client.count)
  const barColors = clients.map(() => theme.palette.primary.main)
  const barHoverColors = clients.map(() => theme.palette.primary.hover)
  console.log(barData)
  console.log(barLabels)
  console.log(clients)

  return (
    <div style={{display: "flex", flexDirection: "column"}}>
    <Typography component="p" variant="h4" className={classes.title}>
      Client types used
    </Typography>
    <ResponsiveContainer aspect={60/28}>
      <BarChart
        data={clients}
        margin={{
          top: 5,
          right: 20,
          left: 20,
          bottom: 5
        }}
      >
    <defs>
    <linearGradient
      id="colorUv"
      x1="0"
      y1="0"
      x2="0"
      y2="100%"
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0" stopColor="#1c2df6" />
      <stop offset="1" stopColor="#98caff" />
    </linearGradient>
  </defs>
      <CartesianGrid strokeDasharray="3 3" stroke="#CBD5E1"/>
      <XAxis dataKey="name" />
      <YAxis dataKey="count" />
      <Bar barSize={80} dataKey="count"  fill="url(#colorUv)" />
    </BarChart>
    </ResponsiveContainer>
    </div>
  )
}

export default ClientTypes1
