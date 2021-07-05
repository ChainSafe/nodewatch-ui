import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { ApplicationRootState } from 'types';
import { utils } from 'ethers'; // Compile error when pulling from `/utils` directly

/* --- STATE --- */
interface Erc20State {
  tokenAddress: string,
  decimals: number,
  symbol: string,
  name: string,
  totalSupply: utils.BigNumber,
  balance: utils.BigNumber,

  paused: boolean
  isPauser: boolean

  isMinter: boolean

  // cap: utils.BigNumber,
}

/* --- ACTIONS --- */
type Erc20Actions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type DomainState = Erc20State;
type DomainActions = Erc20Actions;

export { RootState, DomainState, DomainActions };
