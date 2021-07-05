import { Theme, Typography, WithStyles, Button } from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import React from 'react';
import { appColors } from 'theme';
import { connectorsByName } from 'utils/connectors';
import { AbstractConnectorInterface } from '@web3-react/types';
import classNames from 'classnames';

const styles = ({ spacing, breakpoints }: Theme) => createStyles({
  root:{
    margin: "10px auto",
    textAlign: "center",
  },
  heading:{
    color: appColors.black,
    marginBottom: 15
  },
  subheading:{

  },
  loginOptions:{
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    width: "50%",
    margin: "10vh auto 0"
  },
  connectButton:{
    marginBottom: 20,
    transitionDuration: "200ms",
    "&.connecting":{

    },
    "&.connected":{

    }
  }
});

interface OwnProps extends WithStyles<typeof styles> {
  connector: AbstractConnectorInterface | undefined,
  activatingConnector: AbstractConnectorInterface,
  setActivatingConnector(connector: AbstractConnectorInterface): void,
  activate(connector: AbstractConnectorInterface): void,
}

const Landing: React.SFC<OwnProps> = (props: OwnProps) => {
  const {
    classes,
    activatingConnector,
    setActivatingConnector,
    connector,
    activate
  } = props;


  return <article className={classes.root}>
    <Typography className={classes.heading} variant="h1" component="h1">
      Welcome to the Dapp Boilerplate
    </Typography>
    <Typography className={classes.subheading} variant="h2" component="h2">
      Please connect a wallet through the following options
    </Typography>
    <section className={classes.loginOptions}>
        {Object.keys(connectorsByName).map(name => {
          const currentConnector = connectorsByName[name];
          const connecting = currentConnector === activatingConnector;
          const connected = currentConnector === connector;
          const disabled =
            !!activatingConnector || connected;

          return (
            <Button
              variant="contained"
              color="primary"
              className={classNames(classes.connectButton, connecting ? "connecting" : connected ? "connected" : "")}
              disabled={disabled}
              key={name}
              onClick={() => {
                setActivatingConnector(currentConnector);
                activate(connectorsByName[name]);
              }}
            >
              {name}
            </Button>
          );
        })}
      </section>
  </article>
}

export default withStyles(styles, { withTheme: true })(Landing);
