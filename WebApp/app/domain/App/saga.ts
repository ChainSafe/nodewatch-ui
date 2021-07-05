import { fork, put } from 'redux-saga/effects';

import { setApiSendingFlag } from './actions';

import { apiRequestListener } from './sagas/toggleApiSendingFlag';
import { errorMessageHandler } from './sagas/errorMessageHandler';

export default function* rootDaemonSaga() {
  yield put(setApiSendingFlag(false));
  yield fork(apiRequestListener);

  // Add other global DAEMON sagas here.
  // To prevent performance bottlenecks add sagas with caution.
  yield fork(errorMessageHandler)
}
