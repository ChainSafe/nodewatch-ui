import React from "react"
import { createStyles, makeStyles, useTheme } from "@chainsafe/common-theme"
import { Typography } from "@chainsafe/common-components"
import { Scatter } from "react-chartjs-2"
import { ECTheme } from "../../../../assets/themes/types"

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

const getRandomArr = (length: number) => {
  const arrXY: { x: number; y: number }[] = []
  for (let i = 0; i < length; i++) {
    arrXY.push({
      x: Math.floor(Math.random() * 100),
      y: Math.floor(Math.random() * 100),
    })
  }
  return arrXY
}

const StatusSync = () => {
  const classes = useStyles()
  const theme: ECTheme = useTheme()

  const data = {
    datasets: [
      {
        label: "Node sync",
        data: getRandomArr(50),
        backgroundColor: theme.palette.primary.main,
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
        Status sync over time
      </Typography>
      <div>
        <Scatter data={data} type={"scatter"} options={options} />
      </div>
    </div>
  )
}

export default StatusSync
