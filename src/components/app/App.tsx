import { AppHeader } from '../app-header/header';
import { Main } from '../main/main';
import styles from './app.module.css';
function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <Main></Main>
    </div>
  );
}

export default App;
