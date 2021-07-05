import { take, call, put } from 'redux-saga/effects';
import { getCapAction } from '../../actions';
import { getTokenContract } from 'domain/Erc20/helpers';

function* getCapSaga() {
  try{
    const tokenContract = yield call(getTokenContract)

    const cap = yield call(async () => await tokenContract.cap())

    yield put(getCapAction.success(cap))
  }
  catch(error){
    console.error(error)
    yield put(getCapAction.failure(`${error}`))
  }
}

export function* getCapListener() {
  while(true){
    yield take(getCapAction.request);
    yield call(getCapSaga);
  }
}
