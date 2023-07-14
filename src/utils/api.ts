export const BASE_URL = 'https://norma.nomoreparties.space/api';
export const BASE_URL_INGREDIENTS = BASE_URL + '/ingredients';
export const BASE_URL_ORDERS = BASE_URL + '/orders';

export const SERVER_RESPONSE_TYPES = {
  success: 'success',
  error: {
    invalid_endpoint: 'Проверьте корректность ссылки',
    cant_reach_server: 'Проблемы с соединением'
  },
}

const handleNetworkError = () => {
  return SERVER_RESPONSE_TYPES.error.cant_reach_server
}

const checkResponse = async (data: Response) => {
  if(data && data.ok) {
    return data.json();
  }
  return SERVER_RESPONSE_TYPES.error.invalid_endpoint
}

export const getDataAPI = async () => {
  const result = await fetch(BASE_URL_INGREDIENTS)
    .then(checkResponse)
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
    .then(checkResponse)
    .catch(handleNetworkError)
  return data
}