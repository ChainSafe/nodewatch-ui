import React from "react"
import NodeDemographics from "../Modules/NodeDemographics"
import NodeSoftwareStatistics from "../Modules/NodeSoftwareStatistics"
import { createStyles, ITheme, makeStyles } from "@chainsafe/common-theme"

const useStyles = makeStyles(({ constants, breakpoints }: ITheme) => {
  return createStyles({
    root: {
      margin: `${constants.generalUnit * 4}px 0`,
      display: "grid",
      gridRowGap: constants.generalUnit * 2,
      [breakpoints.down("lg")]: {
        margin: `${constants.generalUnit * 4}px ${constants.generalUnit * 2}px`,
      },
    },
  })
})

function HomePage() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <NodeDemographics />
      <NodeSoftwareStatistics />
    </div>
  )
}

export default HomePage
