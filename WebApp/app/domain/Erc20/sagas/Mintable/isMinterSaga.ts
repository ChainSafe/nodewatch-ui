import { take, call, put } from 'redux-saga/effects';
import { isMinterAction } from '../../actions';
import { getTokenContract } from 'domain/Erc20/helpers';

function* isMinterSaga(account: string) {
  try{
    const tokenContract = yield call(getTokenContract)
    const isMinter: boolean = yield call(async () => await tokenContract.isMinter(account));
    yield put(isMinterAction.success(isMinter))
  }
  catch(error){
    console.error(error)
    yield put(isMinterAction.failure(`${error}`))
  }
}

export function* isMinterListener() {
  while(true){
    const account = (yield take(isMinterAction.request)).payload;
    yield call(isMinterSaga, account);
  }
}
