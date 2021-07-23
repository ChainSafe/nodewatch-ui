/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
import React from "react"
import NodeDemographics from "../Modules/NodeDemographics"
import NodeSoftwareStatistics from "../Modules/NodeSoftwareStatistics"
import { createStyles, makeStyles } from "@chainsafe/common-theme"
import { ECTheme } from "../Themes/types"

const useStyles = makeStyles(({ constants, breakpoints }: ECTheme) => {
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
