import { getType } from 'typesafe-actions';
import { ContainerState, ContainerActions } from './types';
import { setApiSendingFlag, setErrorMessageAction, setConnectedStateAction } from './actions';

/*
 *
 * App reducer
 *
 */

export const initialState: ContainerState = {
  currentlySending: true,
  errorMessage: "",
  connected: false
};

function appReducer(state = initialState, action: ContainerActions) {
  switch (action.type) {
    case getType(setConnectedStateAction):
      return {
        ...state,
        connected: action.payload
      }
    case getType(setApiSendingFlag):
      return {
        ...state,
        currentlySending: action.payload
      }
    case getType(setErrorMessageAction):
      return {
        ...state,
        errorMessage: action.payload
      }
    default:
      return state;
  }
}

export default appReducer;
