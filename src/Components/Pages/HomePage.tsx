/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
import React from "react"
import { createStyles, makeStyles } from "@chainsafe/common-theme"
import { ECTheme } from "../Themes/types"
import ClientTypes from "../Modules/DemographicsStats/ClientTypes"
import HeatMap from "../Modules/HeatMap/MapLeaflet"
import NetworkTypes from "../Modules/SoftwareStats/NetworkTypes"
import OperatingSystems from "../Modules/SoftwareStats/OperatingSystems"
import { useEth2CrawlerApi } from "../../Contexts/Eth2CrawlerContext"
import VersionVariance from "../Modules/SoftwareStats/VersionVariance"
import SectionTile from "../Layouts/SectionTile/SectionTile"
import CardStat from "../Layouts/SectionTile/CardStat"
import NodeStatusOverTime from "../Modules/NodeStats/NodeStatsOverTime"
import GridLayoutWrapper from "../Layouts/GridLayout/GridLayoutWrapper"
import { Typography } from "@chainsafe/common-components"

const useStyles = makeStyles(({ constants, breakpoints, palette }: ECTheme) => {
  return createStyles({
    root: {
      margin: `${constants.generalUnit * 11}px 0 ${constants.generalUnit * 8}px`,
      [breakpoints.down("lg")]: {
        margin: `${constants.generalUnit * 11}px ${constants.generalUnit * 4}px`,
      },
      [breakpoints.down("md")]: {
        margin: `${constants.generalUnit * 11}px ${constants.generalUnit * 2}px`,
      },
      background: palette.background.default,
    },
    title: {
      marginRight: constants.generalUnit,
      marginBottom: constants.generalUnit * 3,
    },
    nodeDemographics: {},
    nodeMapRoot: {
      height: "50vh",
      width: "100%",
      [breakpoints.down("lg")]: {
        height: "50vh",
      },
      [breakpoints.down("md")]: {
        height: "40vh",
      },
      [breakpoints.down("sm")]: {
        height: "25vh",
      },
    },
    nodeStats: {
      display: "grid",
      gridColumnGap: constants.generalUnit,
      gridRowGap: constants.generalUnit * 3,
      gridTemplateColumns: "repeat(2, minmax(0,1fr))",
      maxWidth: "100%",
      [breakpoints.down(1099)]: {
        gridTemplateColumns: "repeat(1, minmax(0,1fr))",
      },
      marginBottom: constants.generalUnit * 4,
    },
    container: {
      marginBottom: constants.generalUnit * 4,
    },
  })
})

function HomePage() {
  const classes = useStyles()
  const { nodeStats, nodeRegionalStats } = useEth2CrawlerApi()

  return (
    <div className={classes.root}>
      <SectionTile
        heading="General Information"
        cardContent={
          <>
            <CardStat heading="Node count" stat={nodeStats?.totalNodes.toString() || "-"} isBlue />
            <CardStat
              heading="Percentage of network synced"
              isGreen
              stat={nodeStats ? `${nodeStats.nodeSyncedPercentage.toFixed(1).toString()}%` : "-"}
            />
            <CardStat
              heading="Percentage of network unsynced"
              stat={nodeStats ? `${nodeStats.nodeUnsyncedPercentage.toFixed(1).toString()}%` : "-"}
              isRed
              tooltip={
                <Typography component="p" variant="body1">
                  The percentage of unsynced nodes shows <br /> percentage of nodes whose latest
                  block number <br /> is behind the latest block number on the network{" "}
                </Typography>
              }
              tooltipId="unsyncedPercentage"
            />
          </>
        }
      >
        <NodeStatusOverTime />
      </SectionTile>
      <SectionTile
        heading="Regional Information"
        cardContent={
          <>
            <CardStat
              heading="Network participants from"
              stat={`${nodeRegionalStats?.totalParticipatingCountries.toString() || "-"} countries`}
            />
            <CardStat
              heading="Percentage of hosted nodes"
              stat={
                nodeRegionalStats
                  ? `${nodeRegionalStats.hostedNodePercentage.toFixed(1).toString()}%`
                  : "-"
              }
            />
            <CardStat
              heading="Percentage of non-hosted nodes"
              stat={
                nodeRegionalStats
                  ? `${nodeRegionalStats.nonhostedNodePercentage.toFixed(1).toString()}%`
                  : "-"
              }
            />
          </>
        }
      >
        <div className={classes.nodeDemographics}>
          <HeatMap rootClassName={classes.nodeMapRoot} />
        </div>
      </SectionTile>
      <GridLayoutWrapper heading="Node Statistics">
        <div className={classes.nodeStats}>
          <ClientTypes />
          <OperatingSystems />
          <NetworkTypes />
          <VersionVariance />
        </div>
      </GridLayoutWrapper>
    </div>
  )
}

export default HomePage
