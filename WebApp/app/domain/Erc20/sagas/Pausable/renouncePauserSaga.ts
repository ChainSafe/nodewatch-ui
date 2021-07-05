import { take, call, put } from 'redux-saga/effects';
import { renouncePauserAction, refreshAction } from '../../actions';
import { getTokenContract } from 'domain/Erc20/helpers';
import { TransactionResponse } from 'ethers/providers';

function* renouncePauserSaga() {
  try{
    const tokenContract = yield call(getTokenContract)
    let txResponse: TransactionResponse = yield call(async () => await tokenContract.renouncePauser())

    yield call(async () => await txResponse.wait(1))
    yield put(renouncePauserAction.success())
    yield put(refreshAction())
  }
  catch(error){
    console.error(error)
    yield put(renouncePauserAction.failure(`${error}`))
  }
}

export function* renouncePauserListener() {
  while(true){
    yield take(renouncePauserAction.request);
    yield call(renouncePauserSaga);
  }
}
