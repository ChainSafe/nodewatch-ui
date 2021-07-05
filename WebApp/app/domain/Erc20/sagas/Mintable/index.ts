import { fork } from "redux-saga/effects"
import { addMinterListener } from "./addMinterSaga"
import { isMinterListener } from "./isMinterSaga"
import { mintListener } from "./mintSaga"
import { renounceMinterListener } from "./renounceMinterSaga"

export default function* MintableSaga() {
  yield fork(addMinterListener)
  yield fork(isMinterListener)
  yield fork(mintListener)
  yield fork(renounceMinterListener)
}
