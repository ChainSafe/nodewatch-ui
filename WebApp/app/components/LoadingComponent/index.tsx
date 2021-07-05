/**
 *
 * LoadingComponent
 *
 */

import React from 'react';
import { Theme, createStyles, withStyles, WithStyles, CircularProgress } from '@material-ui/core';
import classNames from 'classnames';
import { brandColors } from 'theme';

const styles = (theme: Theme) =>
  createStyles({
    loader:{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      transitionDuration: "200ms",
      opacity: 0,
      visibility: "hidden",
      zIndex: 9999999999999,
      "&:before":{
        content: "''",
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        backgroundColor: brandColors.default.secondary,
        opacity: 0.4
      },
      "&.active":{
        opacity: 1,
        visibility: "visible",
      },
      "& > *":{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        height: "120px",
        width:"120px"
      }
    },
    loadingLogo:{
      backgroundColor: brandColors.default.secondary,
      position: "absolute",
      top: "50%",
      left: "50%",
      height: "calc(100% - 18px)",
      width: "calc(100% - 18px)",
      borderRadius: "1000px",
      transform: "translate(-50%,-50%)",
      "& > *":{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "90%",
        transform: "translate(-50%,-50%)",
      }
    }
  });

interface OwnProps extends WithStyles<typeof styles> {
  loading: boolean;
}

const LoadingComponent: React.SFC<OwnProps> = (props: OwnProps) => {
  const {
    classes,
    loading
  } = props;
  return <div className={classNames(classes.loader, loading ? "active" : "")}>
  {
    loading && <div>
      <CircularProgress size={120} color="secondary" />
      <img className={classes.loadingLogo} src="/cat.png" alt=""/>
    </div>
  }
</div>;
};

export default withStyles(styles, { withTheme: true })(LoadingComponent);
