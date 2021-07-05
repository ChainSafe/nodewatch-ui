/**
 *
 * Dashboard
 *
 */

import React from 'react';
import { Theme, createStyles, withStyles, WithStyles, Typography } from '@material-ui/core';
import { uiConstants } from 'theme';

const styles = (theme: Theme) =>
  createStyles({
    root:{
      textAlign: "center",
      minHeight: `calc(100vh - (${
        uiConstants.footerHeight +
        uiConstants.headerHeight +
        (uiConstants.pageMargin * 2) +
        (uiConstants.modal.borderThickness * 2)
      }px))`,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly"
    },
    actions:{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      margin: "10px 0",
      flexWrap: "wrap",
      "& > *":{
        margin: "5px 0",
        width: "calc(50% - 20px)"
      }
    },
  });

interface OwnProps extends WithStyles<typeof styles> {
}

const Dashboard: React.SFC<OwnProps> = (props: OwnProps) => {
  const {
    classes,
  } = props;


  return <section className={classes.root}>
    <div>
      <Typography variant="h1" component="h1">
        Dapp Dashboard
      </Typography>
      <Typography variant="h3" component="h3">
        Olla, you're successfully connected
      </Typography>
    </div>
  </section>
};

export default withStyles(styles, { withTheme: true })(Dashboard);
