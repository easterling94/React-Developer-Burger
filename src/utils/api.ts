export const API = 'https://norma.nomoreparties.space/api/ingredients';
export const FETCH_ERROR = 'error';

export const getData = async (url : string) => {
  const result = await fetch(url)
  .then(data => {
    if(data && data.ok) {
      return data.json();
    }
    return FETCH_ERROR
  })
  .catch(error => {
    alert('Возможно, сервер недоступен, попробуйте еще раз')
    console.log(error)
    return FETCH_ERROR;
  })
  return result
}