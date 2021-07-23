/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
import React from "react"
import { createStyles, makeStyles, useTheme } from "@chainsafe/common-theme"
import { ECTheme } from "../../../Themes/types"
import { Typography } from "@chainsafe/common-components"
import { Bar } from "react-chartjs-2"

const useStyles = makeStyles(({ palette, constants }: ECTheme) => {
  return createStyles({
    root: {
      border: `1px solid ${palette.additional["gray"][4]}`,
      borderRadius: "3px",
      padding: constants.generalUnit * 2,
    },
    title: {
      marginBottom: constants.generalUnit * 2,
    },
  })
})

const VersionVariance = () => {
  const classes = useStyles()
  const theme: ECTheme = useTheme()

  const chartColors = theme.constants.chartColors
  const backgroundColors = Object.values(chartColors)

  const data = {
    labels: ["1", "2", "3", "4", "5"],
    datasets: [
      {
        label: "Client 1",
        data: ["10", "20", "30"],
        backgroundColor: backgroundColors[0],
      },
      {
        label: "Client 2",
        data: ["10", "20", "30"],
        backgroundColor: backgroundColors[1],
      },
      {
        label: "Client 3",
        data: ["10", "20", "30"],
        backgroundColor: backgroundColors[2],
      },
    ],
  }

  const options = {
    scales: {
      y: {
        display: false,
        stacked: true,
      },
      x: {
        display: false,
        grid: {
          display: false,
        },
        stacked: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  }

  return (
    <div className={classes.root}>
      <Typography component="p" variant="body1" className={classes.title}>
        Version variance across clients
      </Typography>
      <div>
        <Bar data={data} type={"bar"} options={options} />
      </div>
    </div>
  )
}

export default VersionVariance
