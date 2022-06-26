import AppHeader from '../app-header/app-header';
import AppBody from '../app-body/app-body'
import { useState, useEffect } from 'react';
import Fetching from './fetching';
import styles from './app.module.css';

const App = () => {
  const url = "https://norma.nomoreparties.space/api/ingredients";

  const [mode, setMode] = useState('constructor');
  const [timer, setTimer] = useState(2);
  const [ingredients, setIngredients] = useState([]);

  const getData = async () => {
    await fetch(url)
      .then(res => res.json())
      .then(data => setIngredients(data.data))
      .catch(() => alert('Что-то пошло не так. Пожалуйста, обновите страницу.'))
  }

  useEffect(() => {
    getData();
  },[])

  useEffect(() => {
    if (timer === 0) return;
    setTimeout(() => setTimer(timer - 1), 1000);
  },[timer])

  const changeMode = (el) => {
    const mode = el.currentTarget.id;
    setMode(mode);
  }
  return (
    <div className={styles.body}>
      <AppHeader mode={mode} changeMode={changeMode} />
      {(ingredients.length && !timer) ? <AppBody mode={mode} ingredients={ingredients}/> : <Fetching/>}
    </div>
  );
}

export default App;
