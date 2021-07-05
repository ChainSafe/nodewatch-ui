import { take, call, put } from 'redux-saga/effects';
import { isPausedAction } from '../../actions';
import { getTokenContract } from 'domain/Erc20/helpers';

function* isPausedSaga() {
  try{
    const tokenContract = yield call(getTokenContract)
    const isPaused: boolean = yield call(async () => await tokenContract.paused());
    yield put(isPausedAction.success(isPaused))
  }
  catch(error){
    console.error(error)
    yield put(isPausedAction.failure(`${error}`))
  }
}

export function* isPausedListener() {
  while(true){
    yield take(isPausedAction.request);
    yield call(isPausedSaga);
  }
}
