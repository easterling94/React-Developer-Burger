export const BASE_URL = 'https://norma.nomoreparties.space/api';
export const BASE_URL_INGREDIENTS = BASE_URL + '/ingredients';
export const BASE_URL_ORDERS = BASE_URL + '/orders';

export const SERVER_RESPONSE_TYPES = {
  success: 'success',
  error: {
    cant_reach_server: 'Проблемы с соединением',
    invalid_endpoint: 'В данный момент сервер не принимает заказы',
  },
}

const handleNetworkError = () => {
  return SERVER_RESPONSE_TYPES.error.cant_reach_server
}

const checkResponse = async (data: Response, requestType: string) => {
  if(data && data.ok) {
    return data.json();
  }
  return requestType === BASE_URL_INGREDIENTS ? 
        SERVER_RESPONSE_TYPES.error.invalid_endpoint 
        : requestType === BASE_URL_ORDERS ? 
        SERVER_RESPONSE_TYPES.error.invalid_endpoint 
        : null
}

export const getDataAPI = async () => {
  const result = await fetch(BASE_URL_INGREDIENTS)
    .then(data => checkResponse(data, BASE_URL_INGREDIENTS))
    .catch(handleNetworkError)
  return result
}

export const sendOrderAPI = async (order: Array<string>) => {
  const data = await fetch(BASE_URL_ORDERS, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify({"ingredients":order.flat()})
  })
    .then(data => checkResponse(data, BASE_URL_ORDERS))
    .catch(handleNetworkError)
  return data
}