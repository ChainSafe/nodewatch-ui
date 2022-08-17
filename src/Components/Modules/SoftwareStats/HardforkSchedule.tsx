/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
import React  from "react"
import { createStyles, makeStyles } from "@chainsafe/common-theme"
import { ECTheme } from "../../Themes/types"
import { useEth2CrawlerApi } from "../../../Contexts/Eth2CrawlerContext"
import { Typography } from "@chainsafe/common-components"
import { GetNextHardForkSchedule_aggregateByHardforkSchedule } from "../../../GraphQL/types/GetNextHardForkSchedule"


const useStyles = makeStyles(({ constants, palette }: ECTheme) => {
  return createStyles({
    root: {
      border: `1px solid ${palette.background.paper}`,
      borderRadius: "3px",
      padding: constants.generalUnit * 2,
      width: "inherit",
      height: "inherit",
    },
    container: {
	color: palette.text.primary,
    },
    title: {
      marginBottom: constants.generalUnit * 4,
      color: palette.text.primary,
    },
  })
})

const TableRow: React.FC<{ item: GetNextHardForkSchedule_aggregateByHardforkSchedule }> = ({ item }) => {
	return (
		<tr>
		  <td><code>{item.version}</code></td>
		  <td><code>{item.epoch}</code></td>
		  <td>{item.count}</td>
		</tr>
	)
}


const ScheduleData: React.FC<{ data: GetNextHardForkSchedule_aggregateByHardforkSchedule[] }> = ({ data }) => {
	if (!data) {
		return (<div>no nodes with scheduled HF</div>)
	}
	return(<div>
		<table width="100%">
			<thead>
			  <tr>
			    <th>Next Fork Version</th>
			    <th>Next Fork Epoch</th>
			    <th># of nodes</th>
			  </tr>
			</thead>
			<tbody>
			{data.map(
				(item: GetNextHardForkSchedule_aggregateByHardforkSchedule) => <TableRow key={JSON.stringify(item)} item={item}/>
			)}
			</tbody>
		</table>
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
      <div className={classes.container}>
		{isLoadingNextHardForkSchedule && <div>Loading...</div>}
		{!isLoadingNextHardForkSchedule && nextHardForkSchedule && <ScheduleData data={nextHardForkSchedule} />}
      </div>
    </div>
  )
}

export default HardforkSchedule
