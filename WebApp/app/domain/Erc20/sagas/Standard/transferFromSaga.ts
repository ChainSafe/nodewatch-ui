import { take, call, put } from 'redux-saga/effects';
import { transferFromAction, refreshAction } from '../../actions';
import { getTokenContract, numberToBN } from 'domain/Erc20/helpers';
import { TransactionResponse } from 'ethers/providers';

function* transferFromSaga(sender: string, recipient: string, amount: number) {
  try{
    const tokenContract = yield call(getTokenContract)
    let txResponse: TransactionResponse = yield call(async () => await tokenContract.transferFrom(sender, recipient, numberToBN(amount)))

    yield call(async () => await txResponse.wait(1))
    yield put(transferFromAction.success())
    yield put(refreshAction())
  }
  catch(error){
    console.error(error)
    yield put(transferFromAction.failure(`${error}`))
  }
}

export function* transferFromListener() {
  while(true){
    const {
      sender,
      recipient,
      amount
    } = (yield take(transferFromAction.request)).payload;
    yield call(transferFromSaga, sender, recipient, amount);
  }
}
