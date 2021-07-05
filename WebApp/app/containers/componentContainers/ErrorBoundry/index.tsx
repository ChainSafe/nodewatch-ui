/**
 *
 * ErrorBoundry
 *
 */

import React, { ReactNode } from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';

interface OwnProps {
  children: ReactNode
}

interface StateProps {}

interface DispatchProps {}

type Props = StateProps & DispatchProps & OwnProps;

interface OwnState {
  error: any
}

type State = OwnState;

export class ErrorBoundry extends React.Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    console.error(error, errorInfo)
  }

  render() {
    if (this.state.error) {
      // TODO Fallback error page
      //render fallback UI
      // return (
      //   <div className="error">
      //     <h1>Something bad happened and we've been notified</h1>
      //   </div>
      // );
      return this.props.children;

    } else {
      //when there's not an error, render children untouched
      return this.props.children;
    }
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: OwnProps,
): DispatchProps => {
  return {
    dispatch: dispatch,
  };
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(ErrorBoundry);
