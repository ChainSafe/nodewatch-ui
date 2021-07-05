import { take, call, put } from 'redux-saga/effects';
import { addPauserAction, refreshAction } from '../../actions';
import { getTokenContract } from 'domain/Erc20/helpers';
import { TransactionResponse } from 'ethers/providers';

function* addPauserSaga(account: string) {
  try{
    const tokenContract = yield call(getTokenContract)
    let txResponse: TransactionResponse = yield call(async () => await tokenContract.addPauser(account))

    yield call(async () => await txResponse.wait(1))
    yield put(addPauserAction.success())
    yield put(refreshAction())
  }
  catch(error){
    console.error(error)
    yield put(addPauserAction.failure(`${error}`))
  }
}

export function* addPauserListener() {
  while(true){
    const account = (yield take(addPauserAction.request)).payload;
    yield call(addPauserSaga, account);
  }
}
