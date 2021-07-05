/**
 *
 * DashboardPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Dashboard from 'components/views/Dashboard';
import { createStructuredSelector } from 'reselect';

interface OwnProps {}

interface DispatchProps {
}

interface StateProps {}

type Props = StateProps & DispatchProps & OwnProps;

const DashboardPage: React.SFC<Props> = (props: Props) => {
  const {
  } = props
  return <Dashboard
  />
};


const mapStateToProps = createStructuredSelector({
});

const mapDispatchToProps = (dispatch) => ({
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(DashboardPage);
