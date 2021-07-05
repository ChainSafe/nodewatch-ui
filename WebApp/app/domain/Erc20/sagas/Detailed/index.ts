import { fork } from "redux-saga/effects"
import { getMetaListener } from "./getMetaSaga"

export default function* DetailedSaga() {
  yield fork(getMetaListener)
}
