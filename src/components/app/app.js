import AppHeader from '../app-header/app-header';
import AppBody from '../app-body/app-body'
import { useState } from 'react';
import Ingredients from '../../utils/data';
import styles from './app.module.css';

const App = () => {
  const [mode, setMode] = useState('constructor');
  const ingredients = Ingredients;
  const changeMode = (el) => {
    const mode = el.currentTarget.id;
    setMode(mode);
  }
  return (
    <div className={styles.body}>
      <AppHeader mode={mode} changeMode={changeMode} />
      <AppBody mode={mode} ingredients={ingredients}/>
    </div>
  );
}

export default App;
