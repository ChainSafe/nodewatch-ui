import { take, call, put } from 'redux-saga/effects';
import { unpauseAction, refreshAction } from '../../actions';
import { getTokenContract } from 'domain/Erc20/helpers';
import { TransactionResponse } from 'ethers/providers';

function* unpauseSaga() {
  try{
    const tokenContract = yield call(getTokenContract)
    let txResponse: TransactionResponse = yield call(async () => await tokenContract.unpause())

    yield call(async () => await txResponse.wait(1))
    yield put(unpauseAction.success())
    yield put(refreshAction())
  }
  catch(error){
    console.error(error)
    yield put(unpauseAction.failure(`${error}`))
  }
}

export function* unpauseListener() {
  while(true){
    yield take(unpauseAction.request);
    yield call(unpauseSaga);
  }
}
