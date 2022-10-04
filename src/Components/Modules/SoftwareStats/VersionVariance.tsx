/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
import React, { useMemo } from "react"
import { createStyles, makeStyles, useTheme } from "@chainsafe/common-theme"
import { ECTheme } from "../../Themes/types"
import { Typography } from "@chainsafe/common-components"
import { useNodewatchCrawlerApi } from "../../../Contexts/NodewatchCrawlerContext"
import { BarChart, Bar, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { useCallback } from "react"
import ToolTipIcon from "../../Elements/Icons/ToolTipIcon"
import ReactTooltip from "react-tooltip"

const useStyles = makeStyles(({ palette, constants }: ECTheme) => {
  return createStyles({
    root: {
      border: `1px solid ${palette.background.paper}`,
      borderRadius: "3px",
      padding: constants.generalUnit * 2,
      width: "inherit",
    },
    chartContainer: {
      height: "280px",
    },
    title: {
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
    tooltipIcon: {
      width: 16,
      height: 16,
      marginLeft: constants.generalUnit,
    },
    headingContainer: {
      display: "flex",
      alignItems: "center",
      color: palette.additional["gray"][2],
      marginBottom: constants.generalUnit * 2,
    },
  })
})

const VersionVariance = () => {
  const classes = useStyles()
  const theme: ECTheme = useTheme()
  const backgroundColors = Object.values(theme.constants.chartColors)

  const { clientVersions } = useNodewatchCrawlerApi()

  const sortedClientVersions = useMemo(
    () =>
      clientVersions
        .sort((a, b) => (a.count < b.count ? -1 : 1))
        .map((clientVersion) => {
          const versions = clientVersion.versions.sort((a, b) => (a.count > b.count ? -1 : 1))
          if (versions.length > 5) {
            const first4Versions = []
            for (let i = 0; i < 4; i++) {
              first4Versions.push(versions[i])
            }
            let othersCount = 0
            for (let i = 4; i < versions.length; i++) {
              othersCount += versions[i].count
            }
            return {
              ...clientVersion,
              versions: [...first4Versions, { name: "others", count: othersCount }],
            }
          } else {
            return {
              ...clientVersion,
              versions,
            }
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
      <div className={classes.headingContainer}>
        <Typography component="p" variant="h4" className={classes.title}>
          Version variance across clients
        </Typography>
        <ToolTipIcon data-tip data-for="nodeVersionVariance" className={classes.tooltipIcon} />
        <ReactTooltip place="bottom" id="nodeVersionVariance">
          <Typography component="p" variant="body1">
            Shows variations in version of node clients <br />
            Shows top 5 versions of known clients
          </Typography>
        </ReactTooltip>
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
