import { SERVER_RESPONSE_TYPES } from './consts';

export const getData = async (url : string) => {
  const result = await fetch(url)
  .then(data => {
    if(data && data.ok) {
      return data.json();
    }
    return SERVER_RESPONSE_TYPES.error
  })
  .catch(() => {
    alert('Возможно, сервер недоступен, попробуйте еще раз')
    return SERVER_RESPONSE_TYPES.error;
  })
  return result
}