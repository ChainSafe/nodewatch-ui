import React from "react"
import { createStyles, ITheme, makeStyles } from "@chainsafe/common-theme"

const useStyles = makeStyles(({ constants, breakpoints }: ITheme) => {
  return createStyles({
    layout: {
      fontFamily: "Neue Montreal",
      margin: constants.generalUnit * 4,
      [breakpoints.down("md")]: {
        margin: constants.generalUnit * 2,
      },
    },
  })
})

const BodyLayout: React.FC = ({ children }) => {
  const classes = useStyles()
  return <div className={classes.layout}>{children}</div>
}

export default BodyLayout
