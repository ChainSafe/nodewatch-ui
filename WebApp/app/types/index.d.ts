import { Reducer, Store } from 'redux';
import { ContainerState as AppState } from '../domain/App/types';
import { ContainerState as Erc20State } from '../domain/Erc20/types';

export interface LifeStore extends Store<{}> {
  injectedReducers: any;
  injectedSagas: any;
  runSaga(saga: (() => IterableIterator<any>) | undefined, args: any | undefined): any;
  [Symbol.observable](): Observable<S>;
}

export interface InjectReducerParams {
  key: keyof ApplicationRootState;
  reducer: Reducer<any, any>;
}

export interface InjectSagaParams {
  key: keyof ApplicationRootState;
  saga: () => IterableIterator<any>;
  mode?: string | undefined;
}

// Your root reducer type, which is your redux state types also
export interface ApplicationRootState {
  readonly global: AppState;
  readonly erc20: Erc20State;
}
