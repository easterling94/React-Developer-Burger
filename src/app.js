import AppHeader from './components/app-header/app-header';
import AppBody from './components/app-body/app-body'
import { useState } from 'react';
import Ingredients from './utils/data';
import './app.css';

const App = () => {
  const [mode, setMode] = useState('constructor');
  let ingredients = Ingredients;
  const changeMode = (el) => {
    const mode = el.currentTarget.id;
    setMode(mode);
  }
  return (
    <div className="App">
      <AppHeader mode={mode} changeMode={changeMode} />
      <AppBody mode={mode} ingredients={ingredients}/>
    </div>
  );
}

export default App;
