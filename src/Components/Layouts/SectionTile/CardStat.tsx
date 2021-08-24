/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
import React from "react"
import { createStyles, makeStyles } from "@chainsafe/common-theme"
import { ECTheme } from "../../Themes/types"
import clsx from "clsx"
import { Typography } from "@chainsafe/common-components"
import ToolTipIcon from "../../Elements/Icons/ToolTipIcon"
import ReactTooltip from "react-tooltip"

const useStyles = makeStyles(({ constants, palette }: ECTheme) => {
  return createStyles({
    root: {
      marginBottom: constants.generalUnit * 6,
    },
    heading: {
      color: palette.additional["gray"][2],
      "&.red": {
        color: constants.statColors.red,
      },
      "&.blue": {
        color: constants.statColors.blue,
      },
      "&.green": {
        color: constants.statColors.green,
      },
    },
    statColor: {
      "&.red": {
        color: constants.statColors.red,
      },
      "&.blue": {
        color: constants.statColors.blue,
      },
      "&.green": {
        color: constants.statColors.green,
      },
    },
    headingContainer: {
      display: "flex",
      alignItems: "center",
    },
    containerMargin: {
      marginBottom: constants.generalUnit * 1.5,
    },
    tooltipIcon: {
      width: 16,
      height: 16,
      marginLeft: constants.generalUnit,
    },
  })
})

export interface ISectionCard {
  heading: string
  stat: string
  className?: string
  isGreen?: boolean
  isRed?: boolean
  isBlue?: boolean
  tooltip?: React.ReactChild
  tooltipId?: string
}

const CardStat = ({
  className,
  heading,
  stat,
  isGreen,
  isBlue,
  isRed,
  tooltip,
  tooltipId,
}: ISectionCard) => {
  const classes = useStyles()

  return (
    <div className={clsx(classes.root, className)}>
      <div className={classes.containerMargin}>
        <div className={classes.headingContainer}>
          <Typography
            className={clsx(classes.heading, isRed && "red", isGreen && "green", isBlue && "blue")}
            component="h4"
            variant="h4"
          >
            {heading}
          </Typography>
          {tooltip && tooltipId && (
            <>
              <ToolTipIcon data-tip data-for={tooltipId} className={classes.tooltipIcon} />
              <ReactTooltip place="bottom" id={tooltipId}>
                {tooltip}
              </ReactTooltip>
            </>
          )}
        </div>
      </div>

      <Typography
        component="p"
        variant="h2"
        className={clsx(classes.heading, isRed && "red", isGreen && "green", isBlue && "blue")}
      >
        {stat}
      </Typography>
    </div>
  )
}

export default CardStat
