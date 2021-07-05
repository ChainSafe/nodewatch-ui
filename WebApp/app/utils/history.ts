import * as historyApi from 'history';
const history = historyApi.createBrowserHistory();
export default history;

export function forwardTo(location) {
  history.push(location);
}

export function goBack(){
  history.goBack();
}
