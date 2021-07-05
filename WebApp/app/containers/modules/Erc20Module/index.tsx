/**
 *
 * Erc20Module
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, Dispatch } from 'redux';
import Erc20View from 'components/views/Erc20View';
import { makeSelectTokenAddress, makeSelectTotalSupply, makeSelectBalance, makeSelectDecimals, makeSelectSymbol, makeSelectName, makeSelectPaused, makeSelectIsPauser, makeSelectIsMinter } from 'domain/Erc20/selectors';
import { setTokenAddressAction, transferAction, transferFromAction, approveAction, increaseAllowanceAction, decreaseAllowanceAction, addMinterAction, addPauserAction, renounceMinterAction, renouncePauserAction, burnAction, mintAction, burnFromAction, unpauseAction, pauseAction, refreshAction } from 'domain/Erc20/actions';

interface OwnProps {}

interface DispatchProps {
  setTokenAddress(tokenAddress: string): void
  burn(amount: number): void
  mint(account: string, amount: number): void
  transfer(recipient: string, amount: number): void
  approve(spender: string, amount: number): void
  increaseAllowance(spender: string, amount: number): void
  decreaseAllowance(spender: string, amount: number): void
  transferFrom(sender: string, recipient: string, amount: number): void
  burnFrom(from: string, amount: number): void
  addMinter(account: string): void
  addPauser(account: string): void;
  renouncePauser(): void;
  renounceMinter(): void;
  pause(): void;
  unpause(): void;
  refresh(): void;
}

interface StateProps {
  tokenAddress: string,
  totalSupply: number,
  balance: number,
  decimals: number
  symbol: string,
  name: string,
  paused: boolean,
  isPauser: boolean,
  isMinter: boolean
}

type Props = StateProps & DispatchProps & OwnProps;

const Erc20Module: React.SFC<Props> = (props: Props) => {
  return <Erc20View {...props}/>
};

const mapStateToProps = createStructuredSelector({
  tokenAddress: makeSelectTokenAddress,
  totalSupply: makeSelectTotalSupply,
  balance: makeSelectBalance,
  decimals: makeSelectDecimals,
  symbol: makeSelectSymbol,
  name: makeSelectName,
  paused: makeSelectPaused,
  isPauser: makeSelectIsPauser,
  isMinter: makeSelectIsMinter
});

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: OwnProps,
): DispatchProps => {
  return {
    setTokenAddress: (tokenAddress: string) => {
      dispatch(setTokenAddressAction(tokenAddress))
    },
    burn: (amount: number) => {
      dispatch(burnAction.request(amount))
    },
    mint: (account: string, amount: number) => {
      dispatch(mintAction.request({account, amount}))
    },
    transfer: (recipient: string, amount: number) => {
      dispatch(transferAction.request({recipient, amount}))
    },
    approve: (spender: string, amount: number) => {
      dispatch(approveAction.request({spender, amount}))
    },
    increaseAllowance: (spender: string, amount: number) => {
      dispatch(increaseAllowanceAction.request({spender, amount}))
    },
    decreaseAllowance: (spender: string, amount: number) => {
      dispatch(decreaseAllowanceAction.request({spender, amount}))
    },
    transferFrom: (sender: string, recipient: string, amount: number) => {
      dispatch(transferFromAction.request({sender, recipient, amount}))
    },
    burnFrom: (from: string, amount: number) => {
      dispatch(burnFromAction.request({from, amount}))
    },
    addMinter: (account: string) => {
      dispatch(addMinterAction.request(account))
    },
    addPauser: (account: string) => {
      dispatch(addPauserAction.request(account))
    },
    renouncePauser: () => {
      dispatch(renouncePauserAction.request())
    },
    renounceMinter: () => {
      dispatch(renounceMinterAction.request())
    },
    pause: () => {
      dispatch(pauseAction.request())
    },
    unpause: () => {
      dispatch(unpauseAction.request())
    },
    refresh: () => {
      dispatch(refreshAction())
    }
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Erc20Module);
