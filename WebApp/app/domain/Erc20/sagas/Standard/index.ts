import { fork } from "redux-saga/effects";
import { approveListener } from "./approveSaga";
import { decreaseAllowanceListener } from "./decreaseAllowanceSaga";
import { getBalanceListener } from "./getBalanceSaga";
import { increaseAllowanceListener } from "./increaseAllowanceSaga";
import { transferFromListener } from "./transferFromSaga";
import { transferListener } from "./transferSaga";
import { getAllowanceListener } from "./getAllowanceSaga";
import { getTotalSupplyListener } from "./getTotalSupplySaga";

export default function* StandardSaga() {
  yield fork(approveListener)
  yield fork(decreaseAllowanceListener)
  yield fork(getBalanceListener)
  yield fork(getAllowanceListener)
  yield fork(getTotalSupplyListener)
  yield fork(increaseAllowanceListener)
  yield fork(transferFromListener)
  yield fork(transferListener)
}
