import React from "react"
import { createStyles, makeStyles } from "@chainsafe/common-theme"
import { ECTheme } from "../../assets/themes/types"

const useStyles = makeStyles(({ breakpoints }: ECTheme) => {
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
