/**
 *
 * DashboardPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import Landing from 'components/views/Landing';
import { useWeb3React } from '@web3-react/core';

interface OwnProps {}

interface DispatchProps {
}

type Props = DispatchProps & OwnProps;

const HomePage: React.SFC<Props> = (props: Props) => {
  const {
  } = props;

  const {
    connector,
    activate,
  }  = useWeb3React();


   // handle logic to recognize the connector currently being activated
   const [activatingConnector, setActivatingConnector] = React.useState();
   React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
   }, [activatingConnector, connector]);


  return <Landing
    activate={activate}
    activatingConnector={activatingConnector}
    connector={connector}
    setActivatingConnector={setActivatingConnector}
  />;
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: OwnProps,
): DispatchProps => {
  return {

  };
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(HomePage);
