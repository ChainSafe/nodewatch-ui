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

const useStyles = makeStyles(({ constants, breakpoints }: ECTheme) => {
  return createStyles({
    root: {
      margin: `${constants.generalUnit * 4}px 0 ${constants.generalUnit * 8}px`,
      display: "grid",
      gridRowGap: constants.generalUnit * 2,
      [breakpoints.down("lg")]: {
        margin: `${constants.generalUnit * 4}px ${constants.generalUnit * 4}px`,
      },
      [breakpoints.down("md")]: {
        margin: `${constants.generalUnit * 4}px ${constants.generalUnit * 2}px`,
      },
    },
    title: {
      marginRight: constants.generalUnit,
    },
    nodeDemographics: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gridColumnGap: constants.generalUnit * 2,
      [breakpoints.down("md")]: {
        gridTemplateColumns: "1fr",
        gridColumnGap: constants.generalUnit * 2,
        gridRowGap: constants.generalUnit * 2,
      },
    },
    nodeMapRoot: {
      height: "75vh",
      width: "100%",
      [breakpoints.down("lg")]: {
        height: "75vh",
      },
      [breakpoints.down("md")]: {
        height: "50vh",
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
      height: `${constants.chartSizes.chartBoxHeight}px`,
      [breakpoints.down("md")]: {
        gridTemplateColumns: "1fr",
      },
    },
    container: {
      marginBottom: constants.generalUnit * 3,
    },
  })
})

function HomePage() {
  const classes = useStyles()
  const { isLoadingClients, isLoadingOperatingSystems, isLoadingNetworks, isLoadingHeatmap } =
    useEth2CrawlerApi()

  return (
    <div className={classes.root}>
      <SectionTile
        heading="General information" 
        cardContent={<>
          <CardStat heading="Node count" stat="10,0000" />
          <CardStat heading="Percentage of network synced" stat="81%" />
        </>}>
        
      </SectionTile>
      <SectionTile
        heading="Regional information" 
        cardContent={<>
          <CardStat heading="Network participants from" stat="212 countries" />
          <CardStat heading="Percentage of residential nodes" stat="60%" />
        </>}>
        {isLoadingHeatmap && <Loading size={24} />}
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
