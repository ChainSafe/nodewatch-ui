import React from "react"
import { createStyles, ITheme, makeStyles } from "@chainsafe/common-theme"
import { Typography } from "@chainsafe/common-components"

const useStyles = makeStyles(({ palette, constants }: ITheme) => {
  return createStyles({
    title: {
      fontSize: "32px",
      lineHeight: "40px",
      color: palette.additional["gray"][6],
    },
    line: {
      width: 24,
      backgroundColor: palette.primary.main,
      height: 2,
      marginBottom: constants.generalUnit * 0.5,
    },
    subtitle: {
      fontSize: "16px",
      lineHeight: "20px",
      color: palette.additional["gray"][6],
      marginBottom: constants.generalUnit * 2,
    },
  })
})

const StatTitleLarge: React.FC = ({ children }) => {
  const classes = useStyles()

  return (
    <div>
      <Typography component="p" variant="body1" className={classes.title}>
        {children}
      </Typography>
      <div className={classes.line} />
    </div>
  )
}

const StatSubTitle: React.FC = ({ children }) => {
  const classes = useStyles()

  return (
    <Typography component="p" variant="body1" className={classes.subtitle}>
      {children}
    </Typography>
  )
}

export { StatTitleLarge, StatSubTitle }
