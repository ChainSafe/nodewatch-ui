import React from "react"
import { createStyles, makeStyles } from "@chainsafe/common-theme"
import { ECTheme } from "../../Themes/types"
import clsx from "clsx"
import { Typography } from "@chainsafe/common-components"

const useStyles = makeStyles(({ constants }: ECTheme) => {
  return createStyles({
    root: {
      marginBottom: constants.generalUnit * 6
    },
    heading: {
      marginBottom: constants.generalUnit * 1.5
    },
  })
})

export interface ISectionCard {
  heading: string
  stat: string
  className?: string
}


const CardStat = ({ className, heading, stat }: ISectionCard) => {
  const classes = useStyles()
  
  return (<div className={clsx(classes.root, className)}>
    <Typography className={classes.heading} component="h2" variant="h3">
      { heading }
    </Typography>
    <Typography component="p" variant="h2">
      { stat }
    </Typography>
  </div>)
}

export default CardStat
