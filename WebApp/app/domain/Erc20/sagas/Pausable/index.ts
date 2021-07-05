import { fork } from "redux-saga/effects"
import { addPauserListener } from "./addPauserSaga"
import { isPausedListener } from "./isPausedSaga"
import { isPauserListener } from "./isPauserSaga"
import { pauseListener } from "./pauseSaga"
import { renouncePauserListener } from "./renouncePauserSaga"
import { unpauseListener } from "./unpauseSaga"

export default function* PausableSaga() {
  yield fork(addPauserListener)
  yield fork(isPausedListener)
  yield fork(isPauserListener)
  yield fork(pauseListener)
  yield fork(renouncePauserListener)
  yield fork(unpauseListener)
}
