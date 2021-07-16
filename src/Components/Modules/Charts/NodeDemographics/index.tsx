import React from "react"
import { createStyles, ITheme, makeStyles } from "@chainsafe/common-theme"
import ClientTypes from "./charts/ClientTypes"
import NodeReadyForFork from "./charts/NodeReadyForFork"
import NodeCount12 from "./charts/NodeCount12"
import StatusSync from "./charts/StatusSync"

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
  })
})

const NodeDemographicCharts = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <ClientTypes />
      <NodeReadyForFork />
      <NodeCount12 />
      <StatusSync />
    </div>
  )
}

export default NodeDemographicCharts
