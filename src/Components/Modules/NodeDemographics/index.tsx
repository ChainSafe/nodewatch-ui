/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
import React from "react"
import { createStyles, makeStyles } from "@chainsafe/common-theme"
import { ECTheme } from "../../../assets/themes/types"
import ClientTypes from "./Stats/ClientTypes"
import NodeReadyForFork from "./Stats/NodeReadyForFork"
import NodeCount12 from "./Stats/NodeCount12"
import StatusSync from "./Stats/StatusSync"
import NodeMap from "./Maps/NodeMap"
import { Typography } from "@chainsafe/common-components"

const useStyles = makeStyles(({ constants, breakpoints }: ECTheme) => {
  return createStyles({
    root: {
      marginBottom: constants.generalUnit * 2,
    },
    demographicsRoot: {
      display: "grid",
      gridColumnGap: constants.generalUnit,
      gridRowGap: constants.generalUnit,
      gridTemplateColumns: "6fr 4fr",
      [breakpoints.down("sm")]: {
        gridTemplateColumns: "1fr",
      },
    },
    title: {
      marginBottom: constants.generalUnit * 4,
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
      height: "52vh",
      width: "100%",
    },
  })
})

const NodeDemographicCharts = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography component="h2" variant="h2" className={classes.title}>
        Eth2 Node Demographics summary
      </Typography>
      <div className={classes.nodeDemographics}>
        <div className={classes.demographicsRoot}>
          <ClientTypes />
          <NodeReadyForFork />
          <NodeCount12 />
          <StatusSync />
        </div>
        <div>
          <NodeMap rootClassName={classes.nodeMapRoot} />
        </div>
      </div>
    </div>
  )
}

export default NodeDemographicCharts
