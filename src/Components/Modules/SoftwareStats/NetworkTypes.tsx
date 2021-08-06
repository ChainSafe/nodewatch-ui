/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
import React from "react"
import { createStyles, makeStyles, useTheme } from "@chainsafe/common-theme"
import { Typography } from "@chainsafe/common-components"
import { useEth2CrawlerApi } from "../../../Contexts/Eth2CrawlerContext"
import { ECTheme } from "../../Themes/types"
import { BarChart, Bar, Tooltip, ResponsiveContainer } from "recharts"

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

const NetworkTypes = () => {
  const classes = useStyles()
  let { networks } = useEth2CrawlerApi()

  const theme: ECTheme = useTheme()

  networks = networks.sort((first, second) => (first.count < second.count ? 1 : -1))
  const chartData = networks.map((network) => ({
    name: network.name,
    count: network.count,
  }))

  return (
    <div className={classes.root}>
      <Typography component="p" variant="body1" className={classes.title}>
        Network types used for node operations
      </Typography>
      <div className={classes.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={150} height={40} data={chartData}>
            <Tooltip />
            <Bar dataKey="count" fill={theme.palette.primary.main} scale="log" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default NetworkTypes
