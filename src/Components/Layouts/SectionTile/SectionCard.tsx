/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
import React, { ReactNode } from "react"
import { createStyles, makeStyles } from "@chainsafe/common-theme"
import clsx from "clsx"
import { ECTheme } from "../../Themes/types"

const useStyles = makeStyles(({ constants, palette, breakpoints }: ECTheme) => {
  return createStyles({
    root: {
      border: `1px solid ${palette.additional["gray"][5]}`,
      padding: constants.generalUnit * 2,
      borderRadius: constants.generalUnit / 2,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      "& > *:last-child": {
        marginBottom: 0,
      },
      [breakpoints.up("md")]: {
        width: "30%",
        marginRight: constants.generalUnit * 3,
      },
      [breakpoints.down("md")]: {
        marginBottom: constants.generalUnit * 3,
      },
    },
  })
})

export interface ISectionCard {
  children: ReactNode | ReactNode[]
  className?: string
}

const SectionCard = ({ children, className }: ISectionCard) => {
  const classes = useStyles()

  return <article className={clsx(classes.root, className)}>{children}</article>
}

export default SectionCard
