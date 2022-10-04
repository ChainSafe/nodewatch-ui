/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
import React, { useMemo } from "react"
import { createStyles, makeStyles, useTheme } from "@chainsafe/common-theme"
import { Typography } from "@chainsafe/common-components"
import { useNodewatchCrawlerApi } from "../../../Contexts/NodewatchCrawlerContext"
import { ECTheme } from "../../Themes/types"
import { BarChart, Bar, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts"

const useStyles = makeStyles(({ palette, constants }: ECTheme) => {
  return createStyles({
    root: {
      border: `1px solid ${palette.background.paper}`,
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
      color: palette.text.primary,
    },
  })
})

// const MIN_CLIENT_COUNT = 20

const ClientTypes = () => {
  const classes = useStyles()
  const theme: ECTheme = useTheme()

  const { clients } = useNodewatchCrawlerApi()

  const chartData = useMemo(
    () =>
      clients
        .sort((first, second) => (first.count > second.count ? 1 : -1))
        // .filter((client) => client.count > MIN_CLIENT_COUNT)
        .map((client) => ({
          name: client.name || "unknown",
          count: client.count,
        })),
    [clients]
  )

  return (
    <div className={classes.root}>
      <Typography component="p" variant="h4" className={classes.title}>
        Client type distribution
      </Typography>
      <div className={classes.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={120} height={80} data={chartData}>
            <XAxis dataKey="name" />
            <YAxis scale="auto"/>
            <Tooltip />
            <Bar dataKey="count" fill={theme.constants.chartPrimaryColors.main} scale={10} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ClientTypes
