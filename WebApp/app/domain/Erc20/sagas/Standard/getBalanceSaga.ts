import { take, call, put } from 'redux-saga/effects';
import { getBalanceAction } from '../../actions';
import { getTokenContract } from 'domain/Erc20/helpers';
import { utils } from 'ethers';

function* getBalanceSaga(account: string) {
  try{
    const tokenContract = yield call(getTokenContract)
    const balance: utils.BigNumber = yield call(async () => await tokenContract.balanceOf(account));
    yield put(getBalanceAction.success(balance))
  }
  catch(error){
    console.error(error)
    yield put(getBalanceAction.failure(`${error}`))
  }
}


export function* getBalanceListener() {
  while(true){
    const account = (yield take(getBalanceAction.request)).payload;
    yield call(getBalanceSaga, account);
  }
}
