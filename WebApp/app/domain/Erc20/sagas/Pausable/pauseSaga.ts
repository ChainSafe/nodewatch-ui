import { take, call, put } from 'redux-saga/effects';
import { pauseAction, refreshAction } from '../../actions';
import { getTokenContract } from 'domain/Erc20/helpers';
import { TransactionResponse } from 'ethers/providers';

function* pauseSaga() {
  try{
    const tokenContract = yield call(getTokenContract)
    let txResponse: TransactionResponse = yield call(async () => await tokenContract.pause())

    yield call(async () => await txResponse.wait(1))
    yield put(pauseAction.success())
    yield put(refreshAction())
  }
  catch(error){
    console.error(error)
    yield put(pauseAction.failure(`${error}`))
  }
}

export function* pauseListener() {
  while(true){
    yield take(pauseAction.request);
    yield call(pauseSaga);
  }
}
