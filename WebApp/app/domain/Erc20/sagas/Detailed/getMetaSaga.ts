import { take, call, put } from 'redux-saga/effects';
import { getMetaAction } from '../../actions';
import { getTokenContract, BNToNumber } from 'domain/Erc20/helpers';

function* getMetaSaga() {
  try{
    const tokenContract = yield call(getTokenContract)

    yield put(getMetaAction.success({
      name: yield call(async () => await tokenContract.name()),
      symbol: yield call(async () => await tokenContract.symbol()),
      decimals: BNToNumber(yield call(async () => await tokenContract.decimals()), 0),
    }))
  }
  catch(error){
    console.error(error)
    yield put(getMetaAction.failure(`${error}`))
  }
}

export function* getMetaListener() {
  while(true){
    yield take(getMetaAction.request);
    yield call(getMetaSaga);
  }
}
