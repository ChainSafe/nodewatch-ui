/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
import React from "react"
import { createStyles, makeStyles, useTheme } from "@chainsafe/common-theme"
import { Typography } from "@chainsafe/common-components"
import { useEth2CrawlerApi } from "../../../Contexts/Eth2CrawlerContext"
import { ECTheme } from "../../Themes/types"
import { BarChart, Bar, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { scaleLog } from "d3-scale"

const useStyles = makeStyles(({ palette, constants }: ECTheme) => {
  return createStyles({
    root: {
      border: `1px solid ${palette.additional["gray"][4]}`,
      borderRadius: "3px",
      padding: constants.generalUnit * 2,
      width: "inherit",
      height: "inherit",
    },
    chartContainer: {
      height: `${constants.chartSizes.chartHeight}px`,
    },
    title: {
      marginBottom: constants.generalUnit * 2,
    },
  })
})

const MIN_CLIENT_COUNT = 20

const ClientTypes = () => {
  const classes = useStyles()
  const theme: ECTheme = useTheme()

  let { clients } = useEth2CrawlerApi()

  clients = clients
    .sort((first, second) => (first.count < second.count ? 1 : -1))
    .filter((client) => client.count > MIN_CLIENT_COUNT)
  const chartData = clients.map((client) => ({
    name: client.name,
    count: client.count,
  }))

  return (
    <div className={classes.root}>
      <Typography component="p" variant="body1" className={classes.title}>
        Client type distribution
      </Typography>
      <div className={classes.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={150} height={40} data={chartData}>
            <XAxis hide={true} dataKey="name" />
            <YAxis scale="sqrt" hide={true} />
            <Tooltip />
            <Bar dataKey="count" fill={theme.palette.primary.main} scale={10} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ClientTypes
