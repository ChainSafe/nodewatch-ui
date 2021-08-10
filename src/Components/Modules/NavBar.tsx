import React from "react"
import { createStyles, ITheme, makeStyles } from "@chainsafe/common-theme"
import { NavLink, Typography } from "@chainsafe/common-components"
import clsx from "clsx"

const useStyles = makeStyles(
  ({ breakpoints, palette, zIndex, constants }: ITheme) => {
    return createStyles({
      container: {
        width: "100vw",
        maxWidth: "90%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        background: palette.common.white.main,
        height: "20px",
        position: "fixed",
        top: "0px",
        zIndex: zIndex?.layer4,
        padding: `${constants.generalUnit*2.5}px 0px`,
        [breakpoints.down('1295')]: {
          padding: `${constants.generalUnit*2.5}px ${constants.generalUnit * 2}px`,
        },
        [breakpoints.down("sm")]: {
          padding: "none",
        },
        [breakpoints.up("xl")]: {
          height: constants.generalUnit * 9,
          width: "100vw",
          left: "50%",
          transform: "translateX(-50%)",
        },
      },
      navlinksWrapper: {
        display: "flex",
        marginLeft: `${constants.generalUnit * 4}px`,
        [breakpoints.down(800)]: {
          marginLeft: `${constants.generalUnit * 2}px`,
        }
      },
      navlink: {
        color: palette.common.black.main,
        fontWeight: "normal",
        textDecoration: "none",
        padding: ".66rem",
        marginLeft: "8px",
        borderRadius: "8px",
        background: palette.additional["gray"][2],
        "&:hover": {
          background: palette.additional["gray"][4],
          transition: "ease-in 0.2s",
        },
      },
      brand: {
        color: palette.common.black.main,
        textDecoration: "none",
        fontWeight: "bold",
      },
      separator: {
        color: palette.common.black.main,
      },
      activeRoute: {
        background: palette.additional["gray"][10],
        color: palette.additional["gray"][2],
        fontWeight: "normal",
      }
    })
  },
)

const NavBar: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
          <Typography variant="h5">
            <a href="/" className={classes.brand}>
              Nodewatch
            </a>
          </Typography>
        <div className={classes.navlinksWrapper}>
            <Typography variant="h5">
              <NavLink
                exact
                to="/"
                className={clsx(classes.navlink)}
                activeClassName={`${classes.activeRoute}`}
                >
                  General
              </NavLink>
            </Typography>
            <Typography variant="h5">
              <NavLink
                exact
                to="/map"
                className={clsx(classes.navlink)}
                activeClassName={`${classes.activeRoute}`}
                >
                  Map
              </NavLink>
            </Typography>
            <Typography variant="h5">
              <NavLink
                exact
                to="/software-stats"
                activeClassName={`${classes.activeRoute}`}
                className={clsx(classes.navlink)}
                >
                  Software
              </NavLink>
            </Typography>
          </div>
    </div>
  )
}

export default NavBar
