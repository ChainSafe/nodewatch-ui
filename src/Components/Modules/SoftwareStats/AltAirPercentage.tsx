/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
import React, { useMemo, useState } from "react"
import { createStyles, makeStyles, useTheme } from "@chainsafe/common-theme"
import { ECTheme } from "../../Themes/types"
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts"
import { useEth2CrawlerApi } from "../../../Contexts/Eth2CrawlerContext"
import { Typography } from "@chainsafe/common-components"

const useStyles = makeStyles(({ constants, palette }: ECTheme) => {
  return createStyles({
    root: {
      border: `1px solid ${palette.background.paper}`,
      borderRadius: "3px",
      padding: constants.generalUnit * 2,
      width: "inherit",
      height: "inherit",
    },
    chartContainer: {
      height: `${constants.chartSizes.chartHeight}px`,
    },
    title: {
      marginBottom: constants.generalUnit * 4,
      color: palette.text.primary,
    },
  })
})

const renderActiveShape = (props: any, fill: string) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, payload } = props

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={"white"}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  )
}

const AltAirPercentage: React.FC = () => {
  const classes = useStyles()
  const theme: ECTheme = useTheme()
  const [activeIndex, setActiveIndex] = useState(0)

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  const { altAirPercentage } = useEth2CrawlerApi()

  const data = useMemo(() => {
    return altAirPercentage !== undefined
      ? [
          {
            name: `Nodes ready (${altAirPercentage.toFixed(1)})%`,
            value: altAirPercentage,
          },
          {
            name: `Nodes not ready (${(100 - altAirPercentage).toFixed(1)})%`,
            value: 100 - altAirPercentage,
          },
        ]
      : []
  }, [altAirPercentage])

  return (
    <div className={classes.root}>
      <Typography component="p" variant="h4" className={classes.title}>
        Nodes ready for Altair upgrade
      </Typography>
      <div className={classes.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={600} height={600}>
            <Pie
              activeIndex={activeIndex}
              activeShape={(props) =>
                renderActiveShape(props, theme.constants.chartPrimaryColors.main)
              }
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={110}
              outerRadius={130}
              fill={theme.constants.chartPrimaryColors.main}
              dataKey="value"
              onMouseEnter={onPieEnter}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default AltAirPercentage
