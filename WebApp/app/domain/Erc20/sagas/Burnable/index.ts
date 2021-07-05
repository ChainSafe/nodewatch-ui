import { fork } from "redux-saga/effects"
import { burnFromListener } from "./burnFromSaga"
import { burnListener } from "./burnSaga"

export default function* BurnableSaga() {
  yield fork(burnFromListener)
  yield fork(burnListener)
}
