import React from "react"
import { createStyles, ITheme, makeStyles } from "@chainsafe/common-theme"
import { Grid, Typography } from "@chainsafe/common-components"

const useStyles = makeStyles(({ palette, constants, breakpoints }: ITheme) => {
  return createStyles({
    root: {
      padding: `${constants.generalUnit * 3}px 0`,
      position: "relative",
      bottom: 0,
      height: "1.5rem",
      background: palette.background.paper,
    },
    bold: {
      fontWeight: 600,
    },
    copyright: {
      display: "flex",
      alignItems: "center",
      color: palette.additional["gray"][4],
      [breakpoints.down("xl")]: {
        marginLeft: constants.generalUnit * 2,
      },
      [breakpoints.up("xl")]: {
        textAlign: "left",
        fontSize: constants.generalUnit *2,
      },
    },
  })
})

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()
  const classes = useStyles()
  return (
    <footer className={classes.root}>
      <Grid container>
        <Grid item>
          <Typography component="p" variant="body1" className={classes.copyright}>
            &copy; {currentYear} ChainSafe Systems, All Rights Reserved.
          </Typography>
        </Grid>
      </Grid>
    </footer>
  )
}
export default Footer
