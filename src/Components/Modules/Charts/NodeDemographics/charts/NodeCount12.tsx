import React from "react"
import { createStyles, ITheme, makeStyles } from "@chainsafe/common-theme"

const useStyles = makeStyles(({ palette }: ITheme) => {
  return createStyles({
    root: {
      border: `1px solid ${palette.additional["gray"][5]}`,
    },
  })
})

const NodeCount12 = () => {
  const classes = useStyles()

  return <div className={classes.root}>node count eth1 and eth2</div>
}

export default NodeCount12
