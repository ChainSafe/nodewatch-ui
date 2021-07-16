import React from "react"
import { createStyles, ITheme, makeStyles } from "@chainsafe/common-theme"
import OperatingSystems from "./Charts/OperatingSystems"
import NetworkTypes from "./Charts/NetworkTypes"
import PercentageOfNodes from "./Charts/PercentageOfNodes"
import VersionVariance from "./Charts/VersionVariance"

const useStyles = makeStyles(({ constants, breakpoints }: ITheme) => {
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
  })
})

const NodeSoftwareStatistics = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <OperatingSystems />
      <NetworkTypes />
      <PercentageOfNodes />
      <VersionVariance />
    </div>
  )
}

export default NodeSoftwareStatistics
