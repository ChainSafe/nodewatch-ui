/*
 *
 * Erc20 reducer
 *
 */


import { DomainState, DomainActions } from './types';
import { getType } from 'typesafe-actions';
import { utils } from 'ethers';
import { setTokenAddressAction, getMetaAction, getBalanceAction, isPausedAction, isPauserAction, renouncePauserAction, pauseAction, unpauseAction, isMinterAction, renounceMinterAction, getTotalSupplyAction } from './actions';

export const initialState: DomainState = {
  tokenAddress: "",
  decimals: 18,
  symbol: "",
  name: "",
  totalSupply: utils.bigNumberify(0),
  balance: utils.bigNumberify(0),

  paused: false,
  isPauser: false,

  isMinter: false,

  // cap: utils.bigNumberify(0)
};

function erc20Reducer(
  state: DomainState = initialState,
  action: DomainActions,
) {
  switch (action.type) {
    case getType(setTokenAddressAction):
      return {
        ...state,
        tokenAddress: action.payload
      }
    case getType(getBalanceAction.success):{
      return {
        ...state,
        balance: action.payload
      }
    }
    case getType(getTotalSupplyAction.success): {
      return {
        ...state,
        totalSupply: action.payload
      }
    }
    // ERC20Detailed.sol
    case getType(getMetaAction.success):
      return {
        ...state,
        decimals: action.payload.decimals,
        symbol: action.payload.symbol,
        name: action.payload.name
      }
    // ERC20Mintable.sol
    case getType(isMinterAction.success):
      return {
        ...state,
        isMinter: action.payload
      }
    case getType(renounceMinterAction.success):
      return {
        ...state,
        isMinter: false
      }

    // ERC20Pausable.sol
    case getType(isPausedAction.success):
      return {
        ...state,
        paused: action.payload
      }

    case getType(isPauserAction.success):
      return {
        ...state,
        isPauser: action.payload
      }

    case getType(renouncePauserAction.success):
      return {
        ...state,
        isPauser: false
      }

    case getType(pauseAction.success):
      return {
        ...state,
        paused: true
      }
    case getType(unpauseAction.success):
      return {
        ...state,
        paused: false
      }
    // ERC20Capped.sol

    // case getType(getCapAction.success):
      // return {
      //   ...state,
      //   cap: action.payload
      // }
    default:
      return state;
  }
}

export default erc20Reducer;
