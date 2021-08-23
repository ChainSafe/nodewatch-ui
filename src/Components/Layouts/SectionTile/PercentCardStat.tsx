/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
import React from "react"
import { createStyles, makeStyles } from "@chainsafe/common-theme"
import { ECTheme } from "../../Themes/types"
import clsx from "clsx"
import { Typography } from "@chainsafe/common-components"

const useStyles = makeStyles(({ constants, palette }: ECTheme) => {
  return createStyles({
    root: {
      marginBottom: constants.generalUnit * 6,
    },
    heading: {
      marginBottom: constants.generalUnit * 1.5,
      color: palette.additional["gray"][2],
      "&.red": {
        color: palette.secondary.main,
      },
      "&.blue": {
        color: palette.primary.main,
      },
      "&.green": {
        color: "#10B981"
      }
    },
    statColor: {
      "&.red": {
        color: palette.secondary.main,
      },
      "&.blue": {
        color: palette.primary.main,
      },
      "&.green": {
        color: "#10B981"
      }
    }
  })
})

export interface ISectionCard {
  heading: string
  stat: string
  className?: string
  isGreen?: boolean
  isRed?: boolean
  isBlue?: boolean
}

const PercentCardStat = ({ className, heading, stat, isGreen, isBlue, isRed }: ISectionCard) => {
  const classes = useStyles()

  return (
    <div className={clsx(classes.root, className)}>
      <Typography className={clsx(classes.heading, isRed && "red", isGreen && "green", isBlue && "blue")} component="h4" variant="h4">
        {heading}
      </Typography>
      <Typography component="p" variant="h2" className={clsx(classes.heading, isRed && "red", isGreen && "green", isBlue && "blue")} >
        {stat}% 
      </Typography>
    </div>
  )
}

export default PercentCardStat
