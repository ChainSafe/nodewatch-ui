import { take, call, put } from 'redux-saga/effects';
import { increaseAllowanceAction, refreshAction } from '../../actions';
import { getTokenContract, numberToBN } from 'domain/Erc20/helpers';
import { TransactionResponse } from 'ethers/providers';

function* increaseAllowanceSaga(spender: string, amount: number) {
  try{
    const tokenContract = yield call(getTokenContract)
    let txResponse: TransactionResponse = yield call(async () => await tokenContract.decreaseAllowance(spender, numberToBN(amount)))

    yield call(async () => await txResponse.wait(1))
    yield put(increaseAllowanceAction.success())
    yield put(refreshAction())
  }
  catch(error){
    console.error(error)
    yield put(increaseAllowanceAction.failure(`${error}`))
  }
}

export function* increaseAllowanceListener() {
  while(true){
    const {
      spender,
      amount
    } = (yield take(increaseAllowanceAction.request)).payload;
    yield call(increaseAllowanceSaga, spender, amount);
  }
}
