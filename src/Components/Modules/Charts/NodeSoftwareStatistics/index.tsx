import React from "react"
import { createStyles, ITheme, makeStyles } from "@chainsafe/common-theme"
import OperatingSystems from "./charts/OperatingSystems"
import NetworkTypes from "./charts/NetworkTypes"
import PercentageOfNodes from "./charts/PercentageOfNodes"
import VersionVariance from "./charts/VersionVariance"

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
