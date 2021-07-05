import { setErrorMessageAction } from "domain/App/actions";
import { put, take, call, fork } from "redux-saga/effects";
import { setTokenAddressAction, getMetaAction, isPausedAction, isMinterAction, isPauserAction, getBalanceAction, refreshAction, getTotalSupplyAction } from "../actions";
import { blockchainContext } from "domain/App/blockchainContext";
import { Wallet } from "ethers";


function* refreshSaga() {
  try{

    const {
      library
    } = blockchainContext;

    const signer: Wallet = yield call(async () => await library?.getSigner());
    const address = yield call(async () => await signer.getAddress())
    yield put(getBalanceAction.request(address))

    yield put(getMetaAction.request())

    yield put(isPausedAction.request())
    yield put(isPauserAction.request(address))

    yield put(isMinterAction.request(address))

    yield put(getTotalSupplyAction.request())

    // yield put(getCapAction.request())

  }
  catch(error){
    console.error(error);
    yield put(setErrorMessageAction(error))
  }
}

function* setTokenListener(){
  while(true){
    yield take(setTokenAddressAction)
    yield call(refreshSaga)
  }
}

function* refreshListener(){
  while(true){
    yield take(refreshAction)
    yield call(refreshSaga)
  }
}

export function* helperListener(){
  yield fork(refreshListener)
  yield fork(setTokenListener)
}
