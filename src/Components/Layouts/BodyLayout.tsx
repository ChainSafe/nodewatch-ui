import React from "react"
import { createStyles, ITheme, makeStyles } from "@chainsafe/common-theme"

const useStyles = makeStyles(({ breakpoints }: ITheme) => {
  return createStyles({
    layout: {
      fontFamily: "Neue Montreal",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      maxWidth: breakpoints.values["lg"],
    },
  })
})

const BodyLayout: React.FC = ({ children }) => {
  const classes = useStyles()
  return <div className={classes.layout}>{children}</div>
}

export default BodyLayout
