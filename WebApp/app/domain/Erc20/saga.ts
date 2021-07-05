// This file is just a stub showing a sample Api request saga.
// For more information on Saga see: https://redux-saga.js.org/

import { fork } from 'redux-saga/effects';
import StandardSaga from './sagas/Standard/index';
import BurnableSaga from './sagas/Burnable';
// import CappedSaga from './sagas/Capped';
import DetailedSaga from './sagas/Detailed';
import MintableSaga from './sagas/Mintable';
import PausableSaga from './sagas/Pausable';
import { helperListener } from './sagas/helperSaga';

export default function* erc20WatcherSaga() {
  yield fork(StandardSaga)
  yield fork(BurnableSaga)
  // yield fork(CappedSaga)
  yield fork(DetailedSaga)
  yield fork(MintableSaga)
  yield fork(PausableSaga)

  yield fork(helperListener)
}
