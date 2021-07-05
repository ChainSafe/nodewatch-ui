import { take, call, put } from 'redux-saga/effects';
import { getAllowanceAction } from '../../actions';
import { getTokenContract } from 'domain/Erc20/helpers';
import { utils } from 'ethers';

function* getAllowanceSaga(owner: string, spender: string) {
  try{
    const tokenContract = yield call(getTokenContract)
    const allowance: utils.BigNumber = yield call(async () => await tokenContract.allowance(owner, spender));
    yield put(getAllowanceAction.success(allowance))
  }
  catch(error){
    console.error(error)
    yield put(getAllowanceAction.failure(`${error}`))
  }
}


export function* getAllowanceListener() {
  while(true){
    const {
      owner,
      spender
    } = (yield take(getAllowanceAction.request)).payload;
    yield call(getAllowanceSaga, owner, spender);
  }
}
