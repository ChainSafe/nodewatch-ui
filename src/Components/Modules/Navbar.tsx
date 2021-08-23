import React from "react"
import { createStyles, ITheme, makeStyles } from "@chainsafe/common-theme"
import { Grid, Typography } from "@chainsafe/common-components"

const useStyles = makeStyles(
  ({ breakpoints, palette, zIndex, constants }: ITheme) => {
    return createStyles({
      container: {
        width: "99%",
        display: "flex",
        justifyContent: "flex-start",
        height: `${constants.headerHeight}px`,
        position: "fixed",
        top: 0,
        padding: `${constants.generalUnit * 2}px`,
        zIndex: zIndex?.layer4,
        [breakpoints.down("sm")]: {
          padding: "none",
          width: "85%",
        },
        [breakpoints.up("xl")]: {
          height: constants.generalUnit * 7,
        },
      },
      navlink: {
        color: palette.common.white.main,
        textDecoration: "none",
        fontWeight: "bold",
        "&:hover": {
          color: palette.primary.main,
          transition: "ease-in 0.2s",
        },
        [breakpoints.up('sm')]: {
          marginRight: `${constants.generalUnit * 2}px`
        }
      },

    })
  },
)

const NavBar: React.FC = () => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <Grid container xs={12}>
        <Grid item justifyContent="center" alignItems="flex-start">
          <Typography variant="h5">
            <a href="/" className={classes.navlink}>
              Eth2 Nodewatch
            </a>
          </Typography>
        </Grid>
        <Grid item justifyContent="flex-end" alignItems="center" flexDirection="row">
          <Typography variant="h5">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/ChainSafe/eth2-crawler-ui"
              className={classes.navlink}
            >
              GitHub
            </a>
          </Typography>
        </Grid>
      </Grid>
    </div>
  )
}

export default NavBar
