/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
import React, { useMemo } from "react"
import { createStyles, makeStyles, useTheme } from "@chainsafe/common-theme"
import { Typography } from "@chainsafe/common-components"
import { useEthereumConsensusCrawlerApi } from "../../../Contexts/EthereumConsensusCrawlerContext"
import { ECTheme } from "../../Themes/types"
import {
  XAxis,
  YAxis,
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  Line,
  Tooltip,
} from "recharts"
import ToolTipIcon from "../../Elements/Icons/ToolTipIcon"
import ReactTooltip from "react-tooltip"
import dayjs from "dayjs"

const useStyles = makeStyles(({ constants, breakpoints, palette, typography }: ECTheme) => {
  return createStyles({
    root: {
      padding: constants.generalUnit * 2,
      width: "inherit",
      height: "inherit",
    },
    chartContainer: {
      height: "40vh",
      width: "100%",
      [breakpoints.down("sm")]: {
        height: "30vh",
      },
    },
    title: {
      color: palette.additional["gray"][2],
    },
    headingContainer: {
      display: "flex",
      alignItems: "center",
      color: palette.additional["gray"][2],
    },
    tooltipIcon: {
      width: 16,
      height: 16,
      marginLeft: constants.generalUnit,
    },
    containerMargin: {
      marginBottom: constants.generalUnit * 4,
    },
    tooltipBody: {
      ...typography.body1,
      backgroundColor: palette.additional["gray"][2],
    },
  })
})

const NodeStatusOverTime = () => {
  const classes = useStyles()
  const theme: ECTheme = useTheme()

  const { nodeStatsOverTime } = useEthereumConsensusCrawlerApi()

  const chartData = useMemo(
    () =>
      nodeStatsOverTime.map(
        (nodeStat: { time: number; totalNodes: any; syncedNodes: any; unsyncedNodes: any }) => ({
          time: dayjs(nodeStat.time * 1000).format("DD MMM 'YY"),
          total: nodeStat.totalNodes,
          synced: nodeStat.syncedNodes,
          unsynced: nodeStat.unsyncedNodes,
        })
      ),
    [nodeStatsOverTime]
  )

  return (
    <div className={classes.root}>
      <div className={classes.containerMargin}>
        <div className={classes.headingContainer}>
          <Typography component="p" variant="h4" className={classes.title}>
            Node count over the past 7 days
          </Typography>
          <ToolTipIcon data-tip data-for="nodeStatsOverTime" className={classes.tooltipIcon} />
          <ReactTooltip place="bottom" id="nodeStatsOverTime">
            <Typography component="p" variant="body1">
              Shows node count over the past 7 days. <br />
              The chart also shows number of nodes <br /> synced and unsynced over the time period.
            </Typography>
          </ReactTooltip>
        </div>
      </div>

      <div className={classes.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={500} height={300} data={chartData}>
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#424F60" strokeDasharray="5 5" />
            <Line
              type="monotone"
              dataKey="total"
              stroke={theme.constants.chartColors.color1}
              strokeWidth="3"
            />
            <Line
              type="monotone"
              dataKey="synced"
              stroke={theme.constants.chartColors.color2}
              strokeWidth="3"
            />
            <Line
              type="monotone"
              dataKey="unsynced"
              stroke={theme.constants.chartColors.color3}
              strokeWidth="3"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default NodeStatusOverTime
