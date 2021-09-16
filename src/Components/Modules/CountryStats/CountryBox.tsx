import React from "react"
import { createStyles, makeStyles } from "@chainsafe/common-theme"
import { ECTheme } from "../../Themes/types"
import clsx from "clsx"
import { Typography } from "@chainsafe/common-components"

const useStyles = makeStyles(({ palette, constants }: ECTheme) => {
  return createStyles({
    root: {
      border: `1px solid ${palette.background.paper}`,
      borderRadius: "3px",
      padding: constants.generalUnit * 2,
      width: "inherit",
      height: "inherit",
    },
    countryTitle: {
      marginRight: constants.generalUnit * 8,
    },
    countRow: {
      display: "flex",
      justifyContent: "space-between",
      color: palette.text.primary,
      margin: `${constants.generalUnit * 2}px 0`,
    },
  })
})

interface ICountryBoxProps {
  countries: {
    rank: number
    name: string
    count: number
    percentage: string
  }[]
  className?: string
}

const CountryBox: React.FC<ICountryBoxProps> = ({ countries, className }) => {
  const classes = useStyles()
  return (
    <div className={clsx(classes.root, className)}>
      {countries.map((country, i) => (
        <div key={i} className={classes.countRow}>
          <Typography className={classes.countryTitle}>
            {country.rank}. {country.name}
          </Typography>
          <Typography>
            {country.count} ({country.percentage}%)
          </Typography>
        </div>
      ))}
    </div>
  )
}

export default CountryBox
