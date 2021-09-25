/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/

import React from "react"
import { createStyles, ITheme, makeStyles } from "@chainsafe/common-theme"
import { Grid, Typography } from "@chainsafe/common-components"

const useStyles = makeStyles(({ palette, constants, breakpoints }: ITheme) => {
  return createStyles({
    root: {
      padding: `${constants.generalUnit * 2}px ${constants.generalUnit}px`,
      background: palette.background.paper,
      display: "flex",
      [breakpoints.down("sm")]: {
        flexDirection: "column",
      },
    },
    bold: {
      fontWeight: 600,
    },
    copyright: {
      display: "flex",
      alignItems: "center",
      fontFamily: "Neue Montreal",
      color: palette.additional["gray"][4],
      marginRight: constants.generalUnit,
      [breakpoints.up("md")]: {
        marginLeft: constants.generalUnit * 2,
      },
      [breakpoints.up("xl")]: {
        textAlign: "left",
        fontSize: constants.generalUnit * 2,
      },
    },
    link: {
      color: palette.additional["gray"][4],
      transition: "all .25s ease-out",
      marginLeft: "2px",
      "&:hover": {
        color: palette.primary.main,
      },
    },
  })
})

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()
  const classes = useStyles()
  return (
    <footer className={classes.root}>
      <Typography component="p" variant="body1" className={classes.copyright}>
        Made with ❤️ by{" "}
        <a
          className={classes.link}
          href="https://chainsafe.io/"
          target="__blank"
          rel="noreferrer noopener"
        >
          {" "}
          ChainSafe Systems
        </a>
        ,
      </Typography>
      <Typography component="p" variant="body1" className={classes.copyright}>
        &copy; {currentYear} ChainSafe Systems Inc.
      </Typography>
    </footer>
  )
}
export default Footer
