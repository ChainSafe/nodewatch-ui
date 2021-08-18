/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
import React, { ReactNode } from "react"
import { createStyles, makeStyles } from "@chainsafe/common-theme"
import { Typography } from "@chainsafe/common-components"
import clsx from "clsx"
import { ECTheme } from "../../Themes/types"

const useStyles = makeStyles(({ constants }: ECTheme) => {
  return createStyles({
    root: {
      marginBottom: constants.generalUnit * 4
    },
    heading: {
      marginBottom: constants.generalUnit * 3
    },
  })
})

interface IGridLayoutWrapper {
  className?: string
  heading: string
  children: ReactNode | ReactNode[]
}

const GridLayoutWrapper = ({ className, heading, children }: IGridLayoutWrapper) => {
  const classes = useStyles()

  return (<section className={clsx(classes.root, className)}>
    <Typography className={classes.heading} component="h2" variant="h2">
      {heading}
    </Typography>
    <div>
      {children}
    </div>
  </section>)
}

export default GridLayoutWrapper
