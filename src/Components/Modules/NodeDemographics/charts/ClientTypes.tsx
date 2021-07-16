import React from "react"
import { createStyles, ITheme, makeStyles } from "@chainsafe/common-theme"

const useStyles = makeStyles(({ palette }: ITheme) => {
  return createStyles({
    root: {
      border: `1px solid ${palette.additional["gray"][5]}`,
    },
  })
})

const ClientTypes = () => {
  const classes = useStyles()

  return <div className={classes.root}>client types</div>
}

export default ClientTypes
