import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';
import { DomainState as ERC20State } from './types';
import { BNToNumber } from './helpers';

/**
 * Direct selector to the erc20 state domain
 */

const selectErc20Domain = (state: ApplicationRootState) => {
  return state ? state.erc20 : initialState;
};

/**
 * Default selector used by Erc20
 */

export const makeSelectErc20 = () =>
  createSelector(
    selectErc20Domain,
    (substate: ERC20State) => {
      return substate;
    },
  );

export const makeSelectTokenAddress =
  createSelector(
    makeSelectErc20(),
    state => {
      return state.tokenAddress
    }
  )

// IERC20.sol
export const makeSelectTotalSupply =
  createSelector(
    makeSelectErc20(),
    state => {
      return BNToNumber(state.totalSupply)
    }
  )

export const makeSelectBalance =
  createSelector(
    makeSelectErc20(),
    state => {
      return BNToNumber(state.balance)
    }
  )

// ERC20Detailed.sol
export const makeSelectDecimals =
  createSelector(
    makeSelectErc20(),
    state => {
      return state.decimals
    }
  )

export const makeSelectSymbol =
  createSelector(
    makeSelectErc20(),
    state => {
      return state.symbol
    }
  )

export const makeSelectName =
  createSelector(
    makeSelectErc20(),
    state => {
      return state.name
    }
  )


  // ERC20Pausable.sol
export const makeSelectPaused =
  createSelector(
    makeSelectErc20(),
    state => {
      return state.paused
    }
  )


export const makeSelectIsPauser =
  createSelector(
    makeSelectErc20(),
    state => {
      return state.isPauser
    }
  )

// ERC20Mintable.sol
export const makeSelectIsMinter =
  createSelector(
    makeSelectErc20(),
    state => {
      return state.isMinter
    }
  )

// ERC20Capped.sol
// export const makeSelectCap =
//   createSelector(
//     makeSelectErc20(),
//     state => {
//       return state.cap
//     }
//   )

/**
 * Other specific selectors
 */
