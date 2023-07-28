import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';

export const ErrorPage = () => {
  const navigate = useNavigate();
  const goToHome = () => {
    navigate(-1, {replace: true})
  } 
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <h1 style={{textAlign: 'center'}}>Похоже, данной страницы нет</h1>
      <Button htmlType='button' type='primary' size='large' onClick={goToHome} style={{alignSelf: 'center'}}>На главную</Button>
    </div>
  )
}