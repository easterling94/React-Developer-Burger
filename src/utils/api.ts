import { getCookie, setCookie } from './cookie';

export const BASE_URL = 'https://norma.nomoreparties.space/api';
export const BASE_URL_INGREDIENTS = '/ingredients';
export const BASE_URL_ORDERS = '/orders';
export const BASE_URL_LOGIN = '/auth/login';
export const BASE_URL_REGISTER = '/auth/register';
export const BASE_URL_LOGOUT = '/auth/logout';
export const BASE_URL_TOKEN = '/auth/token';
export const BASE_URL_UPDATE_USER = '/auth/user'
export const BASE_URL_FORGOT_PASSWORD = '/password-reset';
export const BASE_URL_RESET_PASSWORD = '/password-reset/reset';
export const BASE_WS = 'wss://norma.nomoreparties.space/orders';
export const WS_ALL =  BASE_WS + '/all';

export const checkResponse = async (data: Response) => {
  if(data && data.ok) {
    return data.json();
  }
  else {
    return data.json().then((err) => Promise.reject(err));
  }
}

async function request(endpoint: string, options?: any) {
  return fetch(BASE_URL + endpoint, options).then(checkResponse)
}

export const getDataAPI = async () => {
  const result = await request(BASE_URL_INGREDIENTS)
  return result
}

export const sendOrderAPI = async (order: Array<string>) => {
  const data = await request(BASE_URL_ORDERS, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: 'Bearer ' + getCookie('accessToken')
    },
    body: JSON.stringify({"ingredients":order.flat()})
  })
  return data
}

export const sendRegisterRequestAPI = async (name: string, email: string, password: string) => {
  const data = await request(BASE_URL_REGISTER, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(
      {
        "email": email, 
        "password": password, 
        "name": name,
      } 
    )
  })
  return data
}

export const sendLoginUserAPI = async (email: string, password: string) => {
  const data = await request(BASE_URL_LOGIN, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(
      {
        "email": email, 
        "password": password, 
      } 
     )
   })
   return data;
}

export const sendLogoutUserAPI = async () => {
  const data = await request(BASE_URL_LOGOUT, {
   method: 'POST',
   headers: {
     "Content-Type": "application/json;charset=utf-8",
   },
   body: JSON.stringify(
     {
       token: localStorage.getItem('refreshToken')
     } 
    )
  })
  return data;
}


export const sendGetUserAPI = async () => {
  const data = await fetchWithRefresh(BASE_URL_UPDATE_USER, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: 'Bearer ' + getCookie('accessToken')
    },
  })
  return data
}


export const sendUpdateUserAPI = async (name: string, email: string) => {
  const data = await fetchWithRefresh(BASE_URL_UPDATE_USER, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: 'Bearer ' + getCookie('accessToken')
    },
    body: JSON.stringify(
      {
        "name": name, 
        "email": email, 
      } 
     )
  })
  return data
}

export const sendForgotPasswordAPI = async (email: string) => {
  const data = await request(BASE_URL_FORGOT_PASSWORD, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      "email": email
    })
  })
  return data
}


export const sendResetPasswordAPI = async (password: string, code: string) => {
  const data = await request(BASE_URL_RESET_PASSWORD, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(
      {
        "password": password,
        "token": code,
      }
    )
  })
  return data
}

async function refreshToken () {
  return await request(BASE_URL_TOKEN, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(
      {
        token: localStorage.getItem('refreshToken'),
      }
    )
  });
}


async function fetchWithRefresh (url: string, query: any) {
  try {
    const res = await request(url, query);
    return res
  } catch (error: any) {
    if(error.message === 'jwt expired') {
      const refreshObject = await refreshToken();
      if(!refreshObject.success) {
        return Promise.reject(refreshObject)
      }
      localStorage.setItem('refreshToken', refreshObject.refreshToken);
      const accessTokenForCookie = refreshObject.accessToken.split('Bearer ')[1];
      setCookie('accessToken', accessTokenForCookie)
      query.headers.authorization = refreshObject.accessToken;
      const response = await request(url, query);
      return response
    } else {
      return Promise.reject(error)
    }
  }
}