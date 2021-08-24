/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
import React, { ReactNode } from "react"
import { createStyles, makeStyles } from "@chainsafe/common-theme"
import { Typography } from "@chainsafe/common-components"
import SectionCard from "./SectionCard"
import SectionBody from "./SectionBody"
import clsx from "clsx"
import { ECTheme } from "../../Themes/types"

const useStyles = makeStyles(({ constants, breakpoints, palette }: ECTheme) => {
  return createStyles({
    root: {
      marginBottom: constants.generalUnit * 6,
    },
    heading: {
      marginBottom: constants.generalUnit * 3,
      color: palette.text.primary,
    },
    content: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      [breakpoints.down("md")]: {
        flexDirection: "column",
      },
    },
  })
})

interface ISectionTile {
  className?: string
  heading: string
  cardContent: ReactNode
  children: ReactNode | ReactNode[]
}

const SectionTile = ({ className, heading, cardContent, children }: ISectionTile) => {
  const classes = useStyles()

  return (
    <section className={clsx(classes.root, className)}>
      <Typography className={classes.heading} component="h2" variant="h2">
        {heading}
      </Typography>
      <div className={classes.content}>
        <SectionCard>{cardContent}</SectionCard>
        <SectionBody>{children}</SectionBody>
      </div>
    </section>
  )
}

export default SectionTile
