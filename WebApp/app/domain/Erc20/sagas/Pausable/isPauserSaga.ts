import { take, call, put } from 'redux-saga/effects';
import { isPauserAction } from '../../actions';
import { getTokenContract } from 'domain/Erc20/helpers';

function* isPauserSaga(account: string) {
  try{
    const tokenContract = yield call(getTokenContract)
    const isPauser: boolean = yield call(async () => await tokenContract.isPauser(account));

    // @TODO decide what is happening with non current user requests
    yield put(isPauserAction.success(isPauser))
  }
  catch(error){
    console.error(error)
    yield put(isPauserAction.failure(`${error}`))
  }
}

export function* isPauserListener() {
  while(true){
    const account = (yield take(isPauserAction.request)).payload;
    yield call(isPauserSaga, account);
  }
}
