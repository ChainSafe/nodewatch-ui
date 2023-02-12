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
import { useNodewatchCrawlerApi } from "../../Contexts/NodewatchCrawlerContext"
import VersionVariance from "../Modules/SoftwareStats/VersionVariance"
import SectionTile from "../Layouts/SectionTile/SectionTile"
import CardStat from "../Layouts/SectionTile/CardStat"
import NodeStatusOverTime from "../Modules/NodeStats/NodeStatsOverTime"
import GridLayoutWrapper from "../Layouts/GridLayout/GridLayoutWrapper"
import { Typography } from "@chainsafe/common-components"
import CountryStats from "../Modules/CountryStats"
import AltAirPercentage from "../Modules/SoftwareStats/AltAirPercentage"

const useStyles = makeStyles(({ constants, breakpoints, palette }: ECTheme) => {
  return createStyles({
    root: {
      margin: `${constants.generalUnit * 11}px 0 ${constants.generalUnit * 8}px`,
      [breakpoints.down("lg")]: {
        margin: `${constants.generalUnit * 11}px ${constants.generalUnit * 4}px`,
      },
      [breakpoints.down("md")]: {
        margin: `${constants.generalUnit * 11}px ${constants.generalUnit * 1}px`,
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
        height: "45vh",
      },
      [breakpoints.down("sm")]: {
        height: "40vh",
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
  const { nodeStats, nodeRegionalStats } = useNodewatchCrawlerApi()

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
              tooltip={
                <Typography component="p" variant="body1">
                  If the head of a node is within 256 epochs or 1 day <br />
                  of the head of the chain, we consider it synced.
                </Typography>
              }
              tooltipId="syncedPercentage"
            />
            <CardStat
              heading="Percentage of network unsynced"
              stat={nodeStats ? `${nodeStats.nodeUnsyncedPercentage.toFixed(1).toString()}%` : "-"}
              isRed
              tooltip={
                <Typography component="p" variant="body1">
                  If the head of a node is behind the head of the chain <br />
                  by 256 epochs or 1 day, we consider it unsynced.
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
              tooltip={
                <Typography component="p" variant="body1">
                  If a node is running on a cloud service,
                  <br /> we consider it hosted.
                </Typography>
              }
              tooltipId="hostedPercentage"
            />
            <CardStat
              heading="Percentage of non-hosted nodes"
              stat={
                nodeRegionalStats
                  ? `${nodeRegionalStats.nonhostedNodePercentage.toFixed(1).toString()}%`
                  : "-"
              }
              tooltip={
                <Typography component="p" variant="body1">
                  If a node is running on a network other than a cloud service, <br /> such as
                  residential or business, we consider it non-hosted.
                </Typography>
              }
              tooltipId="nonHostedPercentage"
            />
          </>
        }
      >
        <div className={classes.nodeDemographics}>
          <HeatMap rootClassName={classes.nodeMapRoot} />
        </div>
      </SectionTile>
      <CountryStats />
      <GridLayoutWrapper heading="Node Statistics">
        <div className={classes.nodeStats}>
          <AltAirPercentage />
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
