/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
import React from "react"
import { createStyles, makeStyles, useTheme } from "@chainsafe/common-theme"
import { ECTheme } from "../../Themes/types"
import { Typography } from "@chainsafe/common-components"
import { useEth2CrawlerApi } from "../../../Contexts/Eth2CrawlerContext"
import { BarChart, Bar, Tooltip, ResponsiveContainer } from "recharts"

const useStyles = makeStyles(({ palette, constants }: ECTheme) => {
  return createStyles({
    root: {
      border: `1px solid ${palette.additional["gray"][4]}`,
      borderRadius: "3px",
      padding: constants.generalUnit * 2,
      width: "inherit",
      // height: "160px",
    },
    chartContainer: {
      height: "160px",
    },
    title: {
      marginBottom: constants.generalUnit * 2,
    },
    charts: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
    },
    eachChart: {
      width: "25%",
      height: "100%",
    },
  })
})

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    amt: 2100,
  },
]

const MIN_NODE_COUNT = 100

const VersionVariance = () => {
  const classes = useStyles()
  const theme: ECTheme = useTheme()

  const chartColors = theme.constants.chartColors
  const backgroundColors = Object.values(chartColors)

  let { clientVersions } = useEth2CrawlerApi()
  clientVersions = clientVersions
    .sort((a, b) => (a.count > b.count ? -1 : 1))
    .filter((clientVersion) => clientVersion.count >= MIN_NODE_COUNT)
    .map((clientVersion) => {
      const versions = clientVersion.versions.sort((a, b) => (a.count > b.count ? -1 : 1))
      if (versions.length > 5) {
        versions.length = 5
      }
      return {
        ...clientVersion,
        versions,
      }
    })

  const chartsData = clientVersions.map((clientWithVersions) => ({
    labels: [clientWithVersions.client],
    dataset: [
      {
        label: clientWithVersions.client,
        data: clientWithVersions.versions.map((version) => version.count.toString()),
        backgroundColor: backgroundColors[0],
      },
    ],
  }))

  // const options = {
  //   maintainAspectRatio: false,
  //   scales: {
  //     y: {
  //       display: false,
  //       stacked: true,
  //     },
  //     x: {
  //       display: false,
  //       grid: {
  //         display: false,
  //       },
  //       stacked: true,
  //     },
  //   },
  //   plugins: {
  //     legend: {
  //       display: false,
  //     },
  //   },
  // }

  return (
    // <div className={classes.root}>
    //   <Typography component="p" variant="body1" className={classes.title}>
    //     Version variance across clients
    //   </Typography>
    //   <div style={{ width: "100%", height: "100%" }}>
    <div className={classes.root}>
      {/* <div>
        <Typography component="p" variant="body1" className={classes.title}>
          Version variance across clients
        </Typography>
      </div> */}
      {/* <div style={{ width: "100%", height: "100%" }}> */}
      <div>
        <Typography component="p" variant="body1" className={classes.title}>
          Version variance across clients
        </Typography>
      </div>
      <div className={classes.chartContainer}>
        <ResponsiveContainer>
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            {/* <XAxis dataKey="name" /> */}
            {/* <YAxis /> */}
            <Tooltip />
            {/* <Legend /> */}
            <Bar dataKey="pv" stackId="a" fill="#8884d8" />
            <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
            <Bar dataKey="amt" stackId="a" fill="#82cad9" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* </div> */}
    </div>
    // </div>
    // </div>
  )
}

export default VersionVariance
