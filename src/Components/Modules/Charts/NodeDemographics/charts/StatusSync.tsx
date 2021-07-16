import React from "react"
import { createStyles, ITheme, makeStyles } from "@chainsafe/common-theme"

const useStyles = makeStyles(({ palette }: ITheme) => {
  return createStyles({
    root: {
      border: `1px solid ${palette.additional["gray"][5]}`,
    },
  })
})

const StatusSync = () => {
  const classes = useStyles()

  return <div className={classes.root}>status sync over time</div>
}

export default StatusSync
