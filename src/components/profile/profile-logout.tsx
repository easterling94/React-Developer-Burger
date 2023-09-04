import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { sendLogoutUserThunk } from '../../store/thunks/user';
import { useAppDispatch } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../utils/consts';

export const ProfileLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onClick = () => {
    dispatch(sendLogoutUserThunk());
    navigate(PATHS.LOGIN);
  };
  return (
    <div>
      <Button htmlType='button' onClick={onClick}>
        Выход
      </Button>
    </div>
  );
};
