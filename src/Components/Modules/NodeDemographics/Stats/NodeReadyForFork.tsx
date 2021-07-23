/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
import React from "react"
import { createStyles, makeStyles, useTheme } from "@chainsafe/common-theme"
import { Line } from "react-chartjs-2"
import { Typography } from "@chainsafe/common-components"
import { ECTheme } from "../../../Themes/types"

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

const NodeReadyForFork = () => {
  const classes = useStyles()
  const theme: ECTheme = useTheme()

  const data = {
    labels: ["1", "2", "3", "4", "5", "6", "7"],
    datasets: [
      {
        label: "Node count: eth1",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: theme.palette.primary.main,
        lineTension: 0.3,
      },
    ],
  }

  const options = {
    scales: {
      y: {
        display: false,
      },
      x: {
        display: false,
        grid: {
          display: false,
        },
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
        node ready to fork
      </Typography>
      <div>
        <Line data={data} type={"line"} options={options} />
      </div>
    </div>
  )
}

export default NodeReadyForFork
