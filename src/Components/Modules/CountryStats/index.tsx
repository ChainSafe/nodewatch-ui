/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
import React from "react"
import { createStyles, makeStyles } from "@chainsafe/common-theme"
import { ECTheme } from "../../Themes/types"
import { useEth2CrawlerApi } from "../../../Contexts/Eth2CrawlerContext"
import CountryBox from "./CountryBox"
import StatsChartBox from "./StatsChartBox"
import { Typography } from "@chainsafe/common-components"

const useStyles = makeStyles(({ palette, constants, breakpoints }: ECTheme) => {
  return createStyles({
    root: {
      marginBottom: constants.generalUnit * 6,
    },
    container: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gridColumnGap: constants.generalUnit * 4,
      [breakpoints.down("md")]: {
        gridTemplateColumns: "1fr",
        gridRowGap: constants.generalUnit * 4,
      },
    },
    countryBox1: {
      flex: 1,
    },
    countryBox2: {
      flex: 1,
      [breakpoints.down("sm")]: {
        display: "none",
      },
    },
    statsBox: {},
    title: {
      marginBottom: constants.generalUnit * 3,
      color: palette.text.primary,
    },
  })
})

const CountryStats: React.FC = () => {
  const classes = useStyles()
  const { nodeCountByCountries } = useEth2CrawlerApi()

  const totalNodeCount = nodeCountByCountries.reduce((total, item) => {
    total += item.count
    return total
  }, 0)

  const sortedNodeCountByCountries = nodeCountByCountries
    .sort((a, b) => (a.count < b.count ? 1 : -1))
    .map((nodeByCountry, i) => ({
      ...nodeByCountry,
      rank: i + 1,
      percentage: ((nodeByCountry.count / totalNodeCount) * 100).toFixed(2),
    }))

  const first10Countries = sortedNodeCountByCountries.slice(0, 10)
  const second10Countries = sortedNodeCountByCountries.slice(10, 20)

  return (
    <div className={classes.root}>
      <Typography component="h2" variant="h2" className={classes.title}>
        Node count of countries
      </Typography>
      <div className={classes.container}>
        <CountryBox countries={first10Countries} className={classes.countryBox1} />
        <CountryBox countries={second10Countries} className={classes.countryBox2} />
        <StatsChartBox countries={first10Countries} />
      </div>
    </div>
  )
}

export default CountryStats
