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
      display: "flex",
    },
    countryBox1: {
      marginRight: constants.generalUnit * 2,
    },
    countryBox2: {
      marginRight: constants.generalUnit * 2,
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
    .sort((a, b) => (a.count > b.count ? 1 : 0))
    .map((nodeByCountry, i) => ({
      ...nodeByCountry,
      rank: i + 1,
      percentage: ((nodeByCountry.count / totalNodeCount) * 100).toFixed(2),
    }))

  console.log(sortedNodeCountByCountries)

  const first10Countries = sortedNodeCountByCountries.slice(0, 9)
  const second10Countries = sortedNodeCountByCountries.slice(10, 19)

  return (
    <div className={classes.root}>
      <Typography component="h2" variant="h2" className={classes.title}>
        Node count of countries
      </Typography>
      <div className={classes.container}>
        <CountryBox countries={first10Countries} />
        <CountryBox countries={second10Countries} />
        <StatsChartBox />
      </div>
    </div>
  )
}

export default CountryStats
