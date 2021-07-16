import React from "react"
import { createStyles, ITheme, makeStyles } from "@chainsafe/common-theme"

const useStyles = makeStyles(({ palette, constants }: ITheme) => {
  return createStyles({
    root: {
      border: `1px solid ${palette.additional["gray"][4]}`,
      borderRadius: "3px",
      padding: constants.generalUnit,
    },
  })
})

const PercentageOfNodes = () => {
  const classes = useStyles()

  return <div className={classes.root}>Percentage of nodes not synced in 5 days</div>
}

export default PercentageOfNodes
