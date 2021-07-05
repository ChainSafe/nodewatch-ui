import { take, call, put } from 'redux-saga/effects';
import { burnAction, refreshAction } from '../../actions';
import { getTokenContract, numberToBN } from 'domain/Erc20/helpers';
import { TransactionResponse } from 'ethers/providers';

function* burnSaga(amount: number) {
  try{
    const tokenContract = yield call(getTokenContract)
    let txResponse: TransactionResponse = yield call(async () => await tokenContract.burn(numberToBN(amount)))

    yield call(async () => await txResponse.wait(1))
    yield put(burnAction.success())
    yield put(refreshAction())
  }
  catch(error){
    console.error(error)
    yield put(burnAction.failure(`${error}`))
  }
}

export function* burnListener() {
  while(true){
    const amount = (yield take(burnAction.request)).payload;
    yield call(burnSaga, amount);
  }
}
