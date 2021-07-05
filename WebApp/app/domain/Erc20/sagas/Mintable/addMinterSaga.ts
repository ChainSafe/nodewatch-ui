import { take, call, put } from 'redux-saga/effects';
import { addMinterAction, refreshAction } from '../../actions';
import { getTokenContract } from 'domain/Erc20/helpers';
import { TransactionResponse } from 'ethers/providers';

function* addMinterSaga(address: string) {
  try{
    const tokenContract = yield call(getTokenContract)
    let txResponse: TransactionResponse = yield call(async () => await tokenContract.addMinter(address))

    yield call(async () => await txResponse.wait(1))
    yield put(addMinterAction.success())
    yield put(refreshAction())
  }
  catch(error){
    console.error(error)
    yield put(addMinterAction.failure(`${error}`))
  }
}

export function* addMinterListener() {
  while(true){
    const address = (yield take(addMinterAction.request)).payload;
    yield call(addMinterSaga, address);
  }
}
