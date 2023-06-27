import { AppHeader } from '../app-header/header';
import { ConstructorIndex } from '../constructor';
import styles from './app.module.scss';
function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <ConstructorIndex />
      </main>
    </div>
  );
}

export default App;
