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
        heading="General information"
        cardContent={
          <>
            <CardStat heading="Node count" stat={nodeStats?.totalNodes.toString() || "-"} />
            <CardStat
              heading="Percentage of network synced"
              stat={nodeStats?.nodeSyncedPercentage.toFixed(1).toString() || "-"}
            />
            <CardStat
              heading="Percentage of network > 15% unsynced"
              stat={nodeStats?.nodeUnsyncedPercentage.toFixed(1).toString() || "-"}
            />
          </>
        }
      >
        <NodeStatusOverTime />
      </SectionTile>
      <SectionTile
        heading="Regional information"
        cardContent={
          <>
            <CardStat
              heading="Network participants from"
              stat={`${nodeRegionalStats?.totalParticipatingCountries.toString() || "-"} countries`}
            />
            <CardStat
              heading="Percentage of hosted nodes"
              stat={nodeRegionalStats?.hostedNodePercentage.toFixed(1).toString() || "-"}
            />
            <CardStat
              heading="Percentage of non-hosted nodes"
              stat={nodeRegionalStats?.nonhostedNodePercentage.toFixed(1).toString() || "-"}
            />
          </>
        }
      >
        <div className={classes.nodeDemographics}>
          <HeatMap rootClassName={classes.nodeMapRoot} />
        </div>
      </SectionTile>
      <GridLayoutWrapper heading="Node statistics">
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
