/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
import React from "react"
import { createStyles, makeStyles } from "@chainsafe/common-theme"
import { ECTheme } from "../Themes/types"
import { Loading } from "@chainsafe/common-components"
import ClientTypes from "../Modules/DemographicsStats/ClientTypes"
import HeatMap from "../Modules/HeatMap/MapLeaflet"
import NetworkTypes from "../Modules/SoftwareStats/NetworkTypes"
import OperatingSystems from "../Modules/SoftwareStats/OperatingSystems"
import { useEth2CrawlerApi } from "../../Contexts/Eth2CrawlerContext"
import VersionVariance from "../Modules/SoftwareStats/VersionVariance"
import SectionTile from "../Layouts/SectionTile/SectionTile"
import CardStat from "../Layouts/SectionTile/CardStat"
import GridLayoutWrapper from "../Layouts/GridLayout/GridLayoutWrapper"

const useStyles = makeStyles(({ constants, breakpoints }: ECTheme) => {
  return createStyles({
    root: {
      margin: `${constants.generalUnit * 11}px 0 ${constants.generalUnit * 8}px`,
      [breakpoints.down("lg")]: {
        margin: `${constants.generalUnit * 11}px ${constants.generalUnit * 4}px`,
      },
      [breakpoints.down("md")]: {
        margin: `${constants.generalUnit * 11}px ${constants.generalUnit * 2}px`,
      },
    },
    title: {
      marginRight: constants.generalUnit,
    },
    nodeDemographics: {
    },
    nodeMapRoot: {
      height: "45vh",
      width: "100%",
      [breakpoints.down("lg")]: {
        height: "45vh",
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
      <GridLayoutWrapper
        heading="Node statistics"
      >
      {(isLoadingClients || isLoadingOperatingSystems || isLoadingNetworks) && (
        <Loading size={24} />
      )}
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
