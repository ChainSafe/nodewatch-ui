import { fork } from "redux-saga/effects"
import { getCapListener } from "./getCapSaga"

export default function* CappedSaga() {
  yield fork(getCapListener)
}
