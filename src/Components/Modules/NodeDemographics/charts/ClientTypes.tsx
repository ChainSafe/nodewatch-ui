import React from "react"
import { createStyles, ITheme, makeStyles } from "@chainsafe/common-theme"
import { Typography } from "@chainsafe/common-components"

const useStyles = makeStyles(({ palette, constants }: ITheme) => {
  return createStyles({
    root: {
      border: `1px solid ${palette.additional["gray"][4]}`,
      borderRadius: "3px",
      padding: constants.generalUnit,
    },
  })
})

const ClientTypes = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography component="p" variant="body1">
        Client type distribution
      </Typography>
    </div>
  )
}

export default ClientTypes
