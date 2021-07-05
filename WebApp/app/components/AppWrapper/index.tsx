import CssBaseline from '@material-ui/core/CssBaseline';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import React, { ReactNode } from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { brandColors, uiConstants, appColors } from 'theme';
import { Typography, Button } from '@material-ui/core';
import LoadingComponent from 'components/LoadingComponent';


const styles = theme => createStyles({
  root: {
    display: 'flex',
    flexDirection: "column",
    minHeight: `calc(100vh - ${uiConstants.pageMargin}px)`,
    width: `calc(100vw - ${uiConstants.pageMargin}px)`,
    maxWidth: uiConstants.modal.modalWidthMax,
    // borderBottom: `${uiConstants.modal.borderThickness}px solid ${brandColors.default.secondary}`,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: "space-between"
  },
  header:{
    height: uiConstants.headerHeight,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    color: appColors.black,
    position: "relative",
    width: "100%",
    // Pseudo element used to change opacity independant of header content
    "&:before":{
      content: "''",
      display: "block",
      position: "absolute",
      height: "100%",
      width: "100%",
      top: 0,
      left: 0,
      backgroundColor: brandColors.default.main,
      opacity: 0.8
    }
  },
  content: {
    padding: uiConstants.pageMargin / 1.5,
    flexGrow: 1,
    border: `${uiConstants.modal.borderThickness}px solid ${uiConstants.modal.borderColor}`,
    borderTop: "none",
    borderBottom: "none",
  },
  footer: {
    width: "100%",
    height: uiConstants.footerHeight,
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    color: appColors.black,
    border: `${uiConstants.modal.borderThickness}px solid ${brandColors.default.secondary}`,
    borderTop: "none",
    "&:before":{
      content: "''",
      display: "block",
      position: "absolute",
      height: "100%",
      width: "100%",
      top: 0,
      left: 0,
      backgroundColor: brandColors.default.secondary,
      opacity: 0.8,
      zIndex: -1,
    }
  }
});

interface Props extends WithStyles<typeof styles> {
  currentlySending: boolean;
  isConnected: boolean;
  children: ReactNode,
  active: boolean,
  deactivate(): void,
  account: string | null | undefined
}


const AppWrapper: React.SFC<Props> = (props: Props) => {
  const {
    classes,
    children,
    active,
    deactivate,
    account,
    currentlySending
  } = props;



  return (
    <div className={classes.root}>
      <CssBaseline />
      <header className={classes.header}>
        {
          active &&
          <Button variant="contained" onClick={() => deactivate()}>
            Disconnect
          </Button>
        }
      </header>
      <main className={classes.content}>
        {children}
      </main>
      <footer className={classes.footer}>
        {
          account && <Typography variant="body1" component="span">
          Account: {account}
        </Typography>
        }
      </footer>
      <ToastContainer autoClose={5000} />
      <LoadingComponent loading={currentlySending} />
    </div>
  )
}

export default withStyles(styles, { withTheme: true })(AppWrapper);
