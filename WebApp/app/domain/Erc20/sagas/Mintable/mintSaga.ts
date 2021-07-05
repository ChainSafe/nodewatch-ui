import { take, call, put } from 'redux-saga/effects';
import { mintAction, refreshAction } from '../../actions';
import { getTokenContract, numberToBN } from 'domain/Erc20/helpers';
import { TransactionResponse } from 'ethers/providers';

function* mintSaga(account: string, amount: number) {
  try{
    const tokenContract = yield call(getTokenContract)
    let txResponse: TransactionResponse = yield call(async () => await tokenContract.mint(account, numberToBN(amount)))

    yield call(async () => await txResponse.wait(1))
    yield put(mintAction.success())
    yield put(refreshAction())
  }
  catch(error){
    console.error(error)
    yield put(mintAction.failure(`${error}`))
  }
}

export function* mintListener() {
  while(true){
    const {
      account,
      amount
    } = (yield take(mintAction.request)).payload;
    yield call(mintSaga, account, amount);
  }
}
