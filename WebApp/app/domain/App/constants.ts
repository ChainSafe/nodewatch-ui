/*
 * These are the variables that determine what our central data store (`../reducers/index.js`)
 * changes in our state.
 */

enum ActionTypes {
  SET_API_SENDING_FLAG = '@@app/global/SET_API_SENDING_FLAG',
  SET_ERROR_MESSAGE = '@@app/global/SET_ERROR_MESSAGE',
  CONNECT_WALLET = '@@app/global/CONNECT_WALLET',
  DISCONNECT_WALLET = '@@app/global/DISCONNECT_WALLET',
  SET_CONNECTED = '@@app/global/SET_CONNECTED'
}

export default ActionTypes;
