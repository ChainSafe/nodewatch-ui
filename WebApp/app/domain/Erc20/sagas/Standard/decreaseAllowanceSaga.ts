import { take, call, put } from 'redux-saga/effects';
import { decreaseAllowanceAction, refreshAction } from '../../actions';
import { getTokenContract, numberToBN } from 'domain/Erc20/helpers';
import { TransactionResponse } from 'ethers/providers';

function* decreaseAllowanceSaga(spender: string, amount: number) {
  try{
    const tokenContract = yield call(getTokenContract)
    let txResponse: TransactionResponse = yield call(async () => await tokenContract.decreaseAllowance(spender, numberToBN(amount)))

    yield call(async () => await txResponse.wait(1))
    yield put(decreaseAllowanceAction.success())
    yield put(refreshAction())
  }
  catch(error){
    console.error(error)
    yield put(decreaseAllowanceAction.failure(`${error}`))
  }
}


export function* decreaseAllowanceListener() {
  while(true){
    const {
      spender,
      amount
    } = (yield take(decreaseAllowanceAction.request)).payload;
    yield call(decreaseAllowanceSaga, spender, amount);
  }
}
