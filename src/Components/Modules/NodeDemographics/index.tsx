import React from "react"
import { createStyles, ITheme, makeStyles } from "@chainsafe/common-theme"
import ClientTypes from "./Charts/ClientTypes"
import NodeReadyForFork from "./Charts/NodeReadyForFork"
import NodeCount12 from "./Charts/NodeCount12"
import StatusSync from "./Charts/StatusSync"
import NodeMap from "./Maps/NodeMap"

const useStyles = makeStyles(({ constants, breakpoints }: ITheme) => {
  return createStyles({
    root: {
      display: "grid",
      gridColumnGap: constants.generalUnit,
      gridRowGap: constants.generalUnit,
      gridTemplateColumns: "5fr 6fr",
      [breakpoints.down("sm")]: {
        gridTemplateColumns: "1fr",
      },
    },
    nodeDemographics: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gridColumnGap: constants.generalUnit * 2,
      [breakpoints.down("md")]: {
        gridTemplateColumns: "1fr",
        gridColumnGap: constants.generalUnit * 2,
        gridRowGap: constants.generalUnit * 2,
      },
    },
    nodeMapRoot: {
      height: "50vh",
      width: "100%",
    },
  })
})

const NodeDemographicCharts = () => {
  const classes = useStyles()

  return (
    <div className={classes.nodeDemographics}>
      <div className={classes.root}>
        <ClientTypes />
        <NodeReadyForFork />
        <NodeCount12 />
        <StatusSync />
      </div>
      <div>
        <NodeMap rootClassName={classes.nodeMapRoot} />
      </div>
    </div>
  )
}

export default NodeDemographicCharts
