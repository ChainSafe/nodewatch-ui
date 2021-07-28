/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
import React from "react"
import { createStyles, makeStyles, useTheme } from "@chainsafe/common-theme"
import { Typography } from "@chainsafe/common-components"
import { Bar } from "react-chartjs-2"
import { useEth2CrawlerApi } from "../../../Contexts/Eth2CrawlerContext"
import { ECTheme } from "../../Themes/types"

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

const ClientTypes = () => {
  const classes = useStyles()
  const theme: ECTheme = useTheme()

  let { clients } = useEth2CrawlerApi()

  clients = clients.sort((first, second) => (first.count < second.count ? 1 : -1))

  const barLabels = clients.map((client) => client.name)
  const barData = clients.map((client) => client.count)
  const barColors = clients.map(() => theme.palette.primary.main)
  const barHoverColors = clients.map(() => theme.palette.primary.hover)

  const data = {
    labels: barLabels,
    datasets: [
      {
        data: barData,
        backgroundColor: barColors,
        hoverBackgroundColor: barHoverColors,
        borderWidth: 1,
        maxBarThickness: 25,
      },
    ],
  }

  const options = {
    scales: {
      y: {
        display: false,
        type: "logarithmic",
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
        Client type distribution
      </Typography>
      <div>
        <Bar data={data} options={options} />
      </div>
    </div>
  )
}

export default ClientTypes
