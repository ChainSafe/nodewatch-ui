import { createStandardAction } from 'typesafe-actions';
import ActionTypes from './constants';

export const setApiSendingFlag = createStandardAction(ActionTypes.SET_API_SENDING_FLAG)<boolean>();
export const setErrorMessageAction = createStandardAction(ActionTypes.SET_ERROR_MESSAGE)<string>();

export const setConnectedStateAction = createStandardAction(ActionTypes.SET_CONNECTED)<boolean>();
