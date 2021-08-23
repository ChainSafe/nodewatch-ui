/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
import React from "react"
import { createStyles, makeStyles } from "@chainsafe/common-theme"
import { ECTheme } from "../../Themes/types"
import { Typography } from "@chainsafe/common-components"

const useStyles = makeStyles(({ palette, constants }: ECTheme) => {
  return createStyles({
    root: {
      border: "1px solid #424F60",
      borderRadius: "3px",
      padding: constants.generalUnit * 2,
    },
    title: {
      marginBottom: constants.generalUnit * 4,
    },
    statTitle: {
      color: palette.text.primary,
    },
  })
})

const PERCENT = 2.24

const PercentageOfNodes = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography component="p" variant="body1" className={classes.title}>
        Nodes out of sync for the past 5 days
      </Typography>
      <div>
        <Typography className={classes.statTitle} component="h1" variant="h1">
          {PERCENT}%
        </Typography>
        <Typography component="p" variant="body2">
          of nodes contain out of sync nodes
        </Typography>
      </div>
    </div>
  )
}

export default PercentageOfNodes
