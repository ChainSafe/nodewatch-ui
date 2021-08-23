/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
import React, { useMemo } from "react"
import { createStyles, makeStyles, useTheme } from "@chainsafe/common-theme"
import { ECTheme } from "../../Themes/types"
import { Typography } from "@chainsafe/common-components"
import { useEth2CrawlerApi } from "../../../Contexts/Eth2CrawlerContext"
import { BarChart, Bar, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { useCallback } from "react"

const useStyles = makeStyles(({ palette, constants }: ECTheme) => {
  return createStyles({
    root: {
      border: `1px solid ${palette.background.paper}`,
      borderRadius: "3px",
      padding: constants.generalUnit * 2,
      width: "inherit",
    },
    chartContainer: {
      height: "250px",
    },
    title: {
      marginBottom: constants.generalUnit * 2,
      color: palette.text.primary,
    },
    charts: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
    },
    eachChart: {
      width: "25%",
      height: "100%",
    },
  })
})

const MIN_NODE_COUNT = 50

const VersionVariance = () => {
  const classes = useStyles()
  const theme: ECTheme = useTheme()
  const backgroundColors = Object.values(theme.constants.chartColors)

  const { clientVersions } = useEth2CrawlerApi()

  const sortedClientVersions = useMemo(
    () =>
      clientVersions
        .sort((a, b) => (a.count < b.count ? -1 : 1))
        .filter((clientVersion) => clientVersion.count >= MIN_NODE_COUNT)
        .filter(
          (clientVersion) => clientVersion.client !== "others" && clientVersion.client !== "unknown"
        )
        .map((clientVersion) => {
          const versions = clientVersion.versions.sort((a, b) => (a.count > b.count ? -1 : 1))
          if (versions.length > 5) {
            versions.length = 5
          }
          return {
            ...clientVersion,
            versions,
          }
        }),
    [clientVersions]
  )

  const chartData = useMemo(
    () =>
      sortedClientVersions
        .map((clientVersion) => {
          const stack: Record<string, number | string> = {
            name: clientVersion.client,
          }
          clientVersion.versions.forEach((version) => {
            stack[`${clientVersion.client} ${version.name}`] = version.count
          })
          return stack
        })
        .flat(),
    [sortedClientVersions]
  )

  const getUniqueBars = useCallback(() => {
    const bars: any[] = []
    sortedClientVersions.forEach((clientVersion) => {
      clientVersion.versions.forEach((version, j) => {
        if (!bars.find((bar) => bar.key === `${clientVersion.client} ${version.name}`)) {
          bars.push({
            key: `${clientVersion.client} ${version.name}`,
            dataKey: `${clientVersion.client} ${version.name}`,
            stackId: clientVersion.client,
            fill: backgroundColors[j],
            count: version.count,
          })
        }
      })
    })
    return bars
  }, [sortedClientVersions, backgroundColors])

  const bars = getUniqueBars()

  return (
    <div className={classes.root}>
      <div>
        <Typography component="p" variant="h4" className={classes.title}>
          Version variance across clients
        </Typography>
      </div>
      <div className={classes.chartContainer}>
        <ResponsiveContainer>
          <BarChart width={150} height={250} data={chartData}>
            <XAxis dataKey="name" />
            <YAxis hide scale="auto" />
            <Tooltip />
            {bars.map((bar) => (
              <Bar key={bar.key} dataKey={bar.dataKey} stackId="a" fill={bar.fill} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default VersionVariance
