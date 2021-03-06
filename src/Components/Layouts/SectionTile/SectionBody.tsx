/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
import React, { ReactNode } from "react"
import { createStyles, makeStyles } from "@chainsafe/common-theme"
import { ECTheme } from "../../Themes/types"
import clsx from "clsx"

const useStyles = makeStyles(({ palette, constants }: ECTheme) => {
  return createStyles({
    root: {
      border: `1px solid ${palette.background.paper}`,
      borderRadius: constants.generalUnit / 2,
      flex: "1 1 0",
    },
  })
})

export interface ISectionCard {
  children: ReactNode | ReactNode[]
  className?: string
}

const SectionBody = ({ children, className }: ISectionCard) => {
  const classes = useStyles()

  return <article className={clsx(classes.root, className)}>{children}</article>
}

export default SectionBody
