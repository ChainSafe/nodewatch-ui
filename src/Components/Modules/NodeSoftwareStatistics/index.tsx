import React from "react"
import { createStyles, makeStyles } from "@chainsafe/common-theme"
import { ECTheme } from "../../../assets/themes/types"
import OperatingSystems from "./Charts/OperatingSystems"
import NetworkTypes from "./Charts/NetworkTypes"
import PercentageOfNodes from "./Charts/PercentageOfNodes"
import VersionVariance from "./Charts/VersionVariance"
import { Typography } from "@chainsafe/common-components"

const useStyles = makeStyles(({ constants, breakpoints }: ECTheme) => {
  return createStyles({
    root: {
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
    },
    title: {
      marginBottom: constants.generalUnit * 4,
    },
  })
})

const NodeSoftwareStatistics = () => {
  const classes = useStyles()
  return (
    <div>
      <Typography component="h2" variant="h2" className={classes.title}>
        Node Software Statistics
      </Typography>
      <div className={classes.root}>
        <OperatingSystems />
        <NetworkTypes />
        <PercentageOfNodes />
        <VersionVariance />
      </div>
    </div>
  )
}

export default NodeSoftwareStatistics
