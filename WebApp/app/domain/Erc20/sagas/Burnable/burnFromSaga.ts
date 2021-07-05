import { take, call, put } from 'redux-saga/effects';
import { burnFromAction, refreshAction } from '../../actions';
import { getTokenContract, numberToBN } from 'domain/Erc20/helpers';
import { TransactionResponse } from 'ethers/providers';

function* burnFromSaga(from: string, amount: number) {
  try{
    const tokenContract = yield call(getTokenContract)
    let txResponse: TransactionResponse = yield call(async () => await tokenContract.burnFrom(from, numberToBN(amount)))

    yield call(async () => await txResponse.wait(1))

    yield put(burnFromAction.success())
    yield put(refreshAction())
  }
  catch(error){
    console.error(error)
    yield put(burnFromAction.failure(`${error}`))
  }
}

export function* burnFromListener() {
  while(true){
    const {
      from,
      amount
    } = (yield take(burnFromAction.request)).payload;
    yield call(burnFromSaga, from, amount);
  }
}
