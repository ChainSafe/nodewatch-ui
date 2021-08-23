import React from "react"
import { createStyles, ITheme, makeStyles } from "@chainsafe/common-theme"
import { Grid, Typography } from "@chainsafe/common-components"

const useStyles = makeStyles(({ palette, constants, breakpoints }: ITheme) => {
  return createStyles({
    root: {
      padding: `${constants.generalUnit * 3}px`,
      position: "relative",
      width: "95%",
      bottom: 0,
    },
    linkWrapper: {
      display: "flex",
      flexGrow: 0,
      flexBasis: "200px",
      color: palette.additional["gray"][9],
      margin: "0 0 .5rem 0",
      "&:hover": {
        color: palette.additional["gray"][4],
        transition: "ease-in 0.2s",
      },
      "& a": {
        color: palette.additional["gray"][7],
        textDecoration: "none",
        "&:hover": {
          color: palette.additional["gray"][3],
          transition: "ease-in 0.2s",
        },
      },
      [breakpoints.down("sm")]: {
        flexGrow: 1,
        flexBasis: "100%",
      },
      [breakpoints.down("xl")]: {
        margin: "1rem",
      },
      [breakpoints.up("xl")]: {
        flexBasis: "400px",
      },
    },
    bold: {
      fontWeight: 600,
    },
    copyright: {
      position: "absolute",
      color: palette.additional["gray"][10],
      [breakpoints.down("xl")]: {
        marginLeft: constants.generalUnit * 2,
      },
      [breakpoints.up("xl")]: {
        textAlign: "left",
        fontSize: "1rem",
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
