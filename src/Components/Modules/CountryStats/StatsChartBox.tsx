/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
import React, { useState } from "react"
import { createStyles, makeStyles, useTheme } from "@chainsafe/common-theme"
import { ECTheme } from "../../Themes/types"
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts"

const useStyles = makeStyles(({ constants }: ECTheme) => {
  return createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      flex: 1,
    },
    chartContainer: {
      height: `${constants.chartSizes.chartHeight}px`,
    },
  })
})

interface IStatsChartBoxProps {
  countries: {
    rank: number
    name: string
    count: number
    percentage: string
  }[]
}

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

const CountryBox: React.FC<IStatsChartBoxProps> = ({ countries }) => {
  const classes = useStyles()
  const theme: ECTheme = useTheme()
  const [activeIndex, setActiveIndex] = useState(0)

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  const data = countries.map((country) => ({
    name: `${country.name}(${country.percentage}%)`,
    value: country.count,
  }))

  return (
    <div className={classes.root}>
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

export default CountryBox
