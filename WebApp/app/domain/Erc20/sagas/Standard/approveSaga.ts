import { take, call, put } from 'redux-saga/effects';
import { approveAction, refreshAction } from '../../actions';
import { getTokenContract, numberToBN } from 'domain/Erc20/helpers';
import { TransactionResponse } from 'ethers/providers';

function* approveSaga(spender: string, amount: number) {
  try{
    const tokenContract = yield call(getTokenContract)
    let txResponse: TransactionResponse = yield call(async () => await tokenContract.approve(spender, numberToBN(amount)))

    yield call(async () => await txResponse.wait(1))
    yield put(approveAction.success())
    yield put(refreshAction())

  }
  catch(error){
    console.error(error)
    yield put(approveAction.failure(`${error}`))
  }
}


export function* approveListener() {
  while(true){
    const {
      spender,
      amount
    } = (yield take(approveAction.request)).payload;
    yield call(approveSaga, spender, amount);
  }
}
