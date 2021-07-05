import { take, call, put } from 'redux-saga/effects';
import { transferAction, refreshAction } from '../../actions';
import { getTokenContract, numberToBN } from 'domain/Erc20/helpers';
import { TransactionResponse } from 'ethers/providers';

function* transferSaga(recipient: string, amount: number) {
  try{
    const tokenContract = yield call(getTokenContract)
    let txResponse: TransactionResponse = yield call(async () => await tokenContract.transfer(recipient, numberToBN(amount)))

    yield call(async () => await txResponse.wait(1))
    yield put(transferAction.success())
    yield put(refreshAction())
  }
  catch(error){
    console.error(error)
    yield put(transferAction.failure(`${error}`))
  }
}

export function* transferListener() {
  while(true){
    const {
      recipient,
      amount
    } = (yield take(transferAction.request)).payload;
    yield call(transferSaga, recipient, amount);
  }
}
