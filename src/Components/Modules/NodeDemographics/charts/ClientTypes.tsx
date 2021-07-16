import React from "react"
import { createStyles, ITheme, makeStyles, useTheme } from "@chainsafe/common-theme"
import { Typography } from "@chainsafe/common-components"
import { Bar } from "react-chartjs-2"
import { clients } from "../../../../dummyData/demographicsData"

const useStyles = makeStyles(({ palette, constants }: ITheme) => {
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
  const theme: ITheme = useTheme()

  const barLabels = clients.map((client) => client.client)
  const barData = clients.map((client) => client.total)
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
        <Bar data={data} type={"bar"} options={options} />
      </div>
    </div>
  )
}

export default ClientTypes
