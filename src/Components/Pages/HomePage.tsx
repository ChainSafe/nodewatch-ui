/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
import React from "react"
import { createStyles, makeStyles } from "@chainsafe/common-theme"
import { ECTheme } from "../Themes/types"
import { Loading, Typography } from "@chainsafe/common-components"
import ClientTypes from "../Modules/DemographicsStats/ClientTypes"
import HeatMap from "../Modules/HeatMap/MapLeaflet"
import NetworkTypes from "../Modules/SoftwareStats/NetworkTypes"
import OperatingSystems from "../Modules/SoftwareStats/OperatingSystems"
import { useEth2CrawlerApi } from "../../Contexts/Eth2CrawlerContext"
import VersionVariance from "../Modules/SoftwareStats/VersionVariance"
import SectionTile from "../Layouts/SectionTile/SectionTile"
import CardStat from "../Layouts/SectionTile/CardStat"
import NodeStatusOverTime from "../Modules/NodeStats/NodeStatsOverTime"

const useStyles = makeStyles(({ constants, breakpoints }: ECTheme) => {
  return createStyles({
    root: {
      margin: `${constants.generalUnit * 4}px 0 ${constants.generalUnit * 8}px`,
      [breakpoints.down("lg")]: {
        margin: `${constants.generalUnit * 4}px ${constants.generalUnit * 4}px`,
      },
      [breakpoints.down("md")]: {
        margin: `${constants.generalUnit * 4}px ${constants.generalUnit * 2}px`,
      },
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
        height: "30vh",
      },
    },
    nodeStats: {
      display: "grid",
      gridColumnGap: constants.generalUnit,
      gridRowGap: constants.generalUnit,
      gridTemplateColumns: "1fr 1fr 1fr 1fr",
      [breakpoints.down("md")]: {
        gridTemplateColumns: "1fr 1fr",
      },
      [breakpoints.down("sm")]: {
        gridTemplateColumns: "1fr",
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
  const {
    isLoadingClients,
    isLoadingOperatingSystems,
    isLoadingNetworks,
    nodeStats,
    nodeRegionalStats,
  } = useEth2CrawlerApi()

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
              heading="Percentage of residential nodes"
              stat={nodeRegionalStats?.residentialNodePercentage.toFixed(1).toString() || "-"}
            />
            <CardStat
              heading="Percentage of non-residential nodes"
              stat={nodeRegionalStats?.nonresidentialNodePercentage.toFixed(1).toString() || "-"}
            />
          </>
        }
      >
        <div className={classes.nodeDemographics}>
          <HeatMap rootClassName={classes.nodeMapRoot} />
        </div>
      </SectionTile>
      <div className={classes.container}>
        <Typography component="h2" variant="h2" className={classes.title}>
          Node Statistics
        </Typography>
        {(isLoadingClients || isLoadingOperatingSystems || isLoadingNetworks) && (
          <Loading size={24} />
        )}
        <div className={classes.nodeStats}>
          <ClientTypes />
          <OperatingSystems />
          <NetworkTypes />
          <VersionVariance />
        </div>
      </div>
    </div>
  )
}

export default HomePage
