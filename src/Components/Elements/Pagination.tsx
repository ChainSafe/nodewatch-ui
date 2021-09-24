/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
import React from "react"
import { createStyles, makeStyles } from "@chainsafe/common-theme"
import { ArrowLeftIcon, ArrowRightIcon, Typography } from "@chainsafe/common-components"
import { ECTheme } from "../Themes/types"
import clsx from "clsx"

const useStyles = makeStyles(({ constants, palette }: ECTheme) => {
  return createStyles({
    root: {
      display: "flex",
      color: palette.text.primary,
      alignItems: "center",
    },
    icons: {
      fill: palette.text.primary,
      fontSize: 12,
      cursor: "pointer",
      padding: constants.generalUnit,
    },
    leftIcon: {
      marginRight: constants.generalUnit,
    },
    rightIcon: {
      marginLeft: constants.generalUnit,
    },
  })
})

interface IPaginationProps {
  pageNo: number
  totalPages: number
  onNextPage?: () => void
  onPreviousPage?: () => void
}

const Pagination: React.FC<IPaginationProps> = ({
  pageNo,
  totalPages,
  onNextPage,
  onPreviousPage,
}) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <ArrowLeftIcon
        onClick={onPreviousPage}
        disabled={pageNo <= 1}
        className={clsx(classes.icons, classes.leftIcon)}
      />
      <Typography component="p" variant="body1">
        Page {pageNo} of {totalPages}
      </Typography>
      <ArrowRightIcon
        onClick={onNextPage}
        disabled={pageNo === totalPages}
        className={clsx(classes.icons, classes.rightIcon)}
      />
    </div>
  )
}

export { Pagination }
