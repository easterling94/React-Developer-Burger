import { AppHeader } from '../app-header/header';
import { Constructor } from '../constructor';
import styles from './app.module.css';
function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <Constructor />
      </main>
    </div>
  );
}

export default App;
