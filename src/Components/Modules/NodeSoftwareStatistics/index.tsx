import React from "react"
import { createStyles, makeStyles } from "@chainsafe/common-theme"
import { ECTheme } from "../../../assets/themes/types"
import OperatingSystems from "./Stats/OperatingSystems"
import NetworkTypes from "./Stats/NetworkTypes"
import PercentageOfNodes from "./Stats/PercentageOfNodes"
import VersionVariance from "./Stats/VersionVariance"
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
