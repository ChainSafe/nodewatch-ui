import React from "react"
import { createStyles, makeStyles } from "@chainsafe/common-theme"
import { ECTheme } from "../../Themes/types"

const useStyles = makeStyles(({ palette, constants }: ECTheme) => {
  return createStyles({
    root: {
      border: `1px solid ${palette.background.paper}`,
      borderRadius: "3px",
      padding: constants.generalUnit * 2,
      width: "inherit",
      height: "inherit",
    },
  })
})

interface ICountryBoxProps {}

const CountryBox: React.FC<ICountryBoxProps> = () => {
  const classes = useStyles()
  return <div className={classes.root}></div>
}

export default CountryBox
