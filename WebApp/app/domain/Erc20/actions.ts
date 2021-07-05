/*
 *
 * Erc20 actions
 *
 */

import { createAsyncAction, createStandardAction } from 'typesafe-actions';
import ActionTypes from './constants';
import { utils } from 'ethers';


export const setTokenAddressAction = createStandardAction(
  ActionTypes.SET_TOKEN_ADDRESS,
)<string>();

export const refreshAction = createStandardAction(
  ActionTypes.REFRESH,
)<void>();

export const getBalanceAction = createAsyncAction(
  ActionTypes.GET_BALANCE_REQUEST,
  ActionTypes.GET_BALANCE_SUCCESS,
  ActionTypes.GET_BALANCE_FAILURE,
)<string, utils.BigNumber, string>();

export const getTotalSupplyAction = createAsyncAction(
  ActionTypes.GET_TOTAL_SUPPLY_REQUEST,
  ActionTypes.GET_TOTAL_SUPPLY_SUCCESS,
  ActionTypes.GET_TOTAL_SUPPLY_FAILURE,
)<void, utils.BigNumber, string>();

export const getAllowanceAction = createAsyncAction(
  ActionTypes.GET_ALLOWANCE_REQUEST,
  ActionTypes.GET_ALLOWANCE_SUCCESS,
  ActionTypes.GET_ALLOWANCE_FAILURE,
)<{
  owner: string,
  spender: string
}, utils.BigNumber, string>();


export const transferAction = createAsyncAction(
  ActionTypes.TRANSFER_REQUEST,
  ActionTypes.TRANSFER_SUCCESS,
  ActionTypes.TRANSFER_FAILURE,
)<{
  recipient: string,
  amount: number
}, void, string>();

export const transferFromAction = createAsyncAction(
  ActionTypes.TRANSFER_FROM_REQUEST,
  ActionTypes.TRANSFER_FROM_SUCCESS,
  ActionTypes.TRANSFER_FROM_FAILURE,
)<{
  sender: string,
  recipient: string,
  amount: number
}, void, string>();

export const approveAction = createAsyncAction(
  ActionTypes.APPROVE_REQUEST,
  ActionTypes.APPROVE_SUCCESS,
  ActionTypes.APPROVE_FAILURE,
)<{
  spender: string,
  amount: number
}, void, string>();

export const increaseAllowanceAction = createAsyncAction(
  ActionTypes.INCREASE_ALLOWANCE_REQUEST,
  ActionTypes.INCREASE_ALLOWANCE_SUCCESS,
  ActionTypes.INCREASE_ALLOWANCE_FAILURE,
)<{
  spender: string,
  amount: number
}, void, string>();

export const decreaseAllowanceAction = createAsyncAction(
  ActionTypes.DECREASE_ALLOWANCE_REQUEST,
  ActionTypes.DECREASE_ALLOWANCE_SUCCESS,
  ActionTypes.DECREASE_ALLOWANCE_FAILURE,
)<{
  spender: string,
  amount: number
}, void, string>();


// ERC20Detailed.sol
export const getMetaAction = createAsyncAction(
  ActionTypes.GET_META_REQUEST,
  ActionTypes.GET_META_SUCCESS,
  ActionTypes.GET_META_FAILURE,
)<void, {
  name: string,
  decimals: number,
  symbol: string
}, string>();

// ERC20Mintable.sol
export const isMinterAction = createAsyncAction(
  ActionTypes.IS_MINTER_REQUEST,
  ActionTypes.IS_MINTER_SUCCESS,
  ActionTypes.IS_MINTER_FAILURE,
)<string, boolean, string>();

export const addMinterAction = createAsyncAction(
  ActionTypes.ADD_MINTER_REQUEST,
  ActionTypes.ADD_MINTER_SUCCESS,
  ActionTypes.ADD_MINTER_FAILURE,
)<string, void, string>();

export const renounceMinterAction = createAsyncAction(
  ActionTypes.RENOUNCE_MINTER_REQUEST,
  ActionTypes.RENOUNCE_MINTER_SUCCESS,
  ActionTypes.RENOUNCE_MINTER_FAILURE,
)<void, void, string>();

export const mintAction = createAsyncAction(
  ActionTypes.MINT_REQUEST,
  ActionTypes.MINT_SUCCESS,
  ActionTypes.MINT_FAILURE,
)<{
  account: string
  amount: number
}, void, string>();

// ERC20Burnable.sol
export const burnAction = createAsyncAction(
  ActionTypes.BURN_REQUEST,
  ActionTypes.BURN_SUCCESS,
  ActionTypes.BURN_FAILURE,
)<number, void, string>();

export const burnFromAction = createAsyncAction(
  ActionTypes.BURN_FROM_REQUEST,
  ActionTypes.BURN_FROM_SUCCESS,
  ActionTypes.BURN_FROM_FAILURE,
)<{
  from: string,
  amount: number
}, void, string>();


// ERC20Pausable.sol
export const isPausedAction = createAsyncAction(
  ActionTypes.IS_PAUSED_REQUEST,
  ActionTypes.IS_PAUSED_SUCCESS,
  ActionTypes.IS_PAUSED_FAILURE,
)<void, boolean, string>();

export const isPauserAction = createAsyncAction(
  ActionTypes.IS_PAUSER_REQUEST,
  ActionTypes.IS_PAUSER_SUCCESS,
  ActionTypes.IS_PAUSER_FAILURE,
)<string, boolean, string>();

export const addPauserAction = createAsyncAction(
  ActionTypes.ADD_PAUSER_REQUEST,
  ActionTypes.ADD_PAUSER_SUCCESS,
  ActionTypes.ADD_PAUSER_FAILURE,
)<string, void, string>();

export const renouncePauserAction = createAsyncAction(
  ActionTypes.RENOUNCE_PAUSER_REQUEST,
  ActionTypes.RENOUNCE_PAUSER_SUCCESS,
  ActionTypes.RENOUNCE_PAUSER_FAILURE,
)<void, void, string>();

export const pauseAction = createAsyncAction(
  ActionTypes.PAUSE_REQUEST,
  ActionTypes.PAUSE_SUCCESS,
  ActionTypes.PAUSE_FAILURE,
)<void, void, string>();

export const unpauseAction = createAsyncAction(
  ActionTypes.UNPAUSE_REQUEST,
  ActionTypes.UNPAUSE_SUCCESS,
  ActionTypes.UNPAUSE_FAILURE,
)<void, void, string>();

// ERC20Capped.sol
export const getCapAction = createAsyncAction(
  ActionTypes.GET_CAP_REQUEST,
  ActionTypes.GET_CAP_SUCCESS,
  ActionTypes.GET_CAP_FAILURE,
)<void, utils.BigNumber, string>();
