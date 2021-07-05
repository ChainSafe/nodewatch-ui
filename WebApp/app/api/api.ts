import apiRequest from './apiRequest';
import apiUrlBuilder from './apiUrlBuilder';

export function examplePost(
  var1: string,
  var2: string,
  ){
  const body = JSON.stringify({
    var1: var1,
    var2: var2,
  });
  return apiRequest('POST', apiUrlBuilder.exampleEndpoint, body, 'application/json');
}
