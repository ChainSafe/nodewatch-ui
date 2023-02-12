/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { createStyles, makeStyles, useTheme } from "@chainsafe/common-theme"
import { ECTheme } from "../../Themes/types"
import { useNodewatchCrawlerApi } from "../../../Contexts/NodewatchCrawlerContext"
import CountryBox from "./CountryBox"
import StatsChartBox from "./StatsChartBox"
import { Typography } from "@chainsafe/common-components"
import { Pagination } from "../../Elements/Pagination"
import useWindowDimensions from "../../../utilHooks/useWindowDimensions"

const useStyles = makeStyles(({ palette, constants, breakpoints }: ECTheme) => {
  return createStyles({
    root: {
      marginBottom: constants.generalUnit * 8,
    },
    container: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gridColumnGap: constants.generalUnit * 4,
      minHeight: 430,
      [breakpoints.down("md")]: {
        gridTemplateColumns: "1fr",
        gridRowGap: constants.generalUnit * 2,
      },
      [breakpoints.down("sm")]: {
        gridTemplateColumns: "1fr",
      },
    },
    countriesContainer: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gridColumnGap: constants.generalUnit * 4,
      minHeight: 430,
      [breakpoints.down("md")]: {
        gridTemplateColumns: "1fr 1fr",
        gridRowGap: constants.generalUnit * 4,
      },
      [breakpoints.down("sm")]: {
        gridTemplateColumns: "1fr",
      },
    },
    countryBox1: {
      flex: 1,
    },
    countryBox2: {
      flex: 1,
    },
    title: {
      marginBottom: constants.generalUnit * 3,
      color: palette.text.primary,
    },
    pagination: {
      marginTop: constants.generalUnit * 2,
      [breakpoints.down("md")]: {
        marginTop: 0,
        marginBottom: constants.generalUnit * 4,
      },
      [breakpoints.down("sm")]: {
        marginBottom: constants.generalUnit * 4,
      },
    },
  })
})

const PAGE_SIZE = 20
const HALF_PAGE_SIZE = PAGE_SIZE / 2

const CountryStats: React.FC = () => {
  const classes = useStyles()
  const { nodeCountByCountries } = useNodewatchCrawlerApi()
  const [pageNo, setPageNo] = useState(0)

  const { width } = useWindowDimensions()
  const theme: ECTheme = useTheme()
  const isDesktop = width > theme.breakpoints.values["md"]
  const isTab = width > theme.breakpoints.values["sm"] && width < theme.breakpoints.values["md"]

  const showTwoCountryBoxes = isDesktop || isTab

  useEffect(() => {
    if (nodeCountByCountries.length) {
      setPageNo(1)
    }
  }, [nodeCountByCountries, isDesktop])

  const totalPages = useMemo(
    () => Math.ceil(nodeCountByCountries.length / (isDesktop ? PAGE_SIZE : HALF_PAGE_SIZE)),
    [nodeCountByCountries, isDesktop]
  )

  const onPrevPage = useCallback(() => {
    if (pageNo > 1) {
      setPageNo(pageNo - 1)
    }
  }, [pageNo])

  const onNextPage = useCallback(() => {
    if (pageNo < totalPages) {
      setPageNo(pageNo + 1)
    }
  }, [pageNo, totalPages])

  const totalNodeCount = useMemo(
    () =>
      nodeCountByCountries.reduce((total, item) => {
        total += item.count
        return total
      }, 0),
    [nodeCountByCountries]
  )

  const sortedNodeCountByCountries = useMemo(
    () =>
      nodeCountByCountries
        .sort((a, b) => (a.count < b.count ? 1 : -1))
        .map((nodeByCountry, i) => ({
          ...nodeByCountry,
          rank: i + 1,
          percentage: ((nodeByCountry.count / totalNodeCount) * 100).toFixed(2),
        })),
    [nodeCountByCountries, totalNodeCount]
  )

  const first10Countries = sortedNodeCountByCountries.slice(
    (pageNo - 1) * (showTwoCountryBoxes ? PAGE_SIZE : HALF_PAGE_SIZE),
    showTwoCountryBoxes ? pageNo * PAGE_SIZE - HALF_PAGE_SIZE : pageNo * HALF_PAGE_SIZE
  )
  const second10Countries = sortedNodeCountByCountries.slice(
    pageNo * PAGE_SIZE - HALF_PAGE_SIZE,
    pageNo * PAGE_SIZE
  )

  return (
    <div className={classes.root}>
      <Typography component="h2" variant="h2" className={classes.title}>
        Node count by countries
      </Typography>
      <div className={classes.container}>
        <div className={classes.countriesContainer}>
          <CountryBox countries={first10Countries} className={classes.countryBox1} />
          {showTwoCountryBoxes && (
            <CountryBox countries={second10Countries} className={classes.countryBox2} />
          )}
        </div>
        {(!showTwoCountryBoxes || isTab) && (
          <div className={classes.pagination}>
            <Pagination
              pageNo={pageNo}
              totalPages={totalPages}
              onNextPage={onNextPage}
              onPreviousPage={onPrevPage}
            />
          </div>
        )}
        <StatsChartBox countries={first10Countries} />
      </div>
      {pageNo > 0 && showTwoCountryBoxes && !isTab && (
        <div className={classes.pagination}>
          <Pagination
            pageNo={pageNo}
            totalPages={totalPages}
            onNextPage={onNextPage}
            onPreviousPage={onPrevPage}
          />
        </div>
      )}
    </div>
  )
}

export default CountryStats
