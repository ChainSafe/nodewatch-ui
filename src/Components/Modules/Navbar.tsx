/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/

import React from "react"
import { createStyles, ITheme, makeStyles } from "@chainsafe/common-theme"
import { Typography } from "@chainsafe/common-components"

const useStyles = makeStyles(({ breakpoints, palette, zIndex, constants }: ITheme) => {
  return createStyles({
    container: {
      width: "100%",
      display: "flex",
      background: palette.background.default,
      position: "fixed",
      top: 0,
      zIndex: zIndex?.layer4,
    },
    box: {
      padding: `${constants.generalUnit * 3}px ${constants.generalUnit * 4}px`,
      display: "flex",
      flex: 1,
      justifyContent: "space-between",
      [breakpoints.down("sm")]: {
        padding: `${constants.generalUnit * 3}px ${constants.generalUnit * 1}px`,
      },
    },
    navLink: {
      color: palette.common.white.main,
      textDecoration: "none",
      fontFamily: "Neue Montreal",
      fontWeight: "bold",
      "&:hover": {
        color: palette.primary.main,
        transition: "ease-in 0.2s",
      },
    },
  })
})

const NavBar: React.FC = () => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Typography variant="h5">
          <a href="/" className={classes.navLink}>
            Ethereum Consensus Nodewatch
          </a>
        </Typography>
        <Typography variant="h5">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/ChainSafe/eth2-crawler-ui"
            className={classes.navLink}
          >
            GitHub
          </a>
        </Typography>
      </div>
    </div>
  )
}

export default NavBar
