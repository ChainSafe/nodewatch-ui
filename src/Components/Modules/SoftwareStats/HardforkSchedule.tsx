/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
import React  from "react"
import { createStyles, makeStyles, useTheme } from "@chainsafe/common-theme"
import { ECTheme } from "../../Themes/types"
import { useEth2CrawlerApi } from "../../../Contexts/Eth2CrawlerContext"
import { Typography } from "@chainsafe/common-components"


const useStyles = makeStyles(({ constants, palette }: ECTheme) => {
  return createStyles({
    root: {
      border: `1px solid ${palette.background.paper}`,
      borderRadius: "3px",
      padding: constants.generalUnit * 2,
      width: "inherit",
      height: "inherit",
    },
    chartContainer: {
      height: `${constants.chartSizes.chartHeight}px`,
    },
    title: {
      marginBottom: constants.generalUnit * 4,
      color: palette.text.primary,
    },
  })
})


const ScheduleData: React.FC<{ data: any }> = ({ data }) => {
	if (!data) {
		return (<div>no nodes with scheduled HF</div>)
	}
	return(<div>
		boo
	</div>)
}


const HardforkSchedule: React.FC = () => {
  const classes = useStyles()

  const { nextHardForkSchedule, isLoadingNextHardForkSchedule } = useEth2CrawlerApi()

  return (
    <div className={classes.root}>
      <Typography component="p" variant="h4" className={classes.title}>
	Hardfork Schedule
      </Typography>
      <div className={classes.chartContainer}>
		{isLoadingNextHardForkSchedule && <div>Loading...</div>}
		{!isLoadingNextHardForkSchedule && nextHardForkSchedule && <ScheduleData data={nextHardForkSchedule} />}
		<p>{nextHardForkSchedule}</p>
      </div>
    </div>
  )
}

export default HardforkSchedule
