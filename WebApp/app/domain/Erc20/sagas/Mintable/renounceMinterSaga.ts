import { take, call, put } from 'redux-saga/effects';
import { renounceMinterAction, refreshAction } from '../../actions';
import { getTokenContract } from 'domain/Erc20/helpers';
import { TransactionResponse } from 'ethers/providers';

function* renounceMinterSaga() {
  try{
    const tokenContract = yield call(getTokenContract)
    let txResponse: TransactionResponse = yield call(async () => await tokenContract.renounceMinter())

    yield call(async () => await txResponse.wait(1))
    yield put(renounceMinterAction.success())
    yield put(refreshAction())
  }
  catch(error){
    console.error(error)
    yield put(renounceMinterAction.failure(`${error}`))
  }
}

export function* renounceMinterListener() {
  while(true){
    yield take(renounceMinterAction.request);
    yield call(renounceMinterSaga);
  }
}
