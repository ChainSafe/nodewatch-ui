import { take, call, put } from 'redux-saga/effects';
import { getTotalSupplyAction } from '../../actions';
import { getTokenContract } from 'domain/Erc20/helpers';
import { utils } from 'ethers';

function* getTotalSupplySaga() {
  try{
    const tokenContract = yield call(getTokenContract)
    const totalSupply: utils.BigNumber = yield call(async () => await tokenContract.totalSupply());
    yield put(getTotalSupplyAction.success(totalSupply))
  }
  catch(error){
    console.error(error)
    yield put(getTotalSupplyAction.failure(`${error}`))
  }
}

export function* getTotalSupplyListener() {
  while(true){
    yield take(getTotalSupplyAction.request);
    yield call(getTotalSupplySaga);
  }
}
