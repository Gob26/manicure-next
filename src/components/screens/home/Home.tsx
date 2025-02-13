import { FC } from "react";
import styles from "./Home.module.scss";

const Home: FC = () => {
  return (
    <div className={styles.home}>
      <main className={styles.main}>
        <h1>Добро пожаловать на платформу маникюра!</h1>
        <p>Исследуйте лучшие салоны и мастеров вашего города.</p>
      </main>

      <section className={styles.contentGrid}>
        <div className={styles.card}>Контент 1</div>
        <div className={styles.card}>Контент 2</div>
        <div className={styles.card}>Контент 3</div>
        <div className={styles.card}>Контент 4</div>
      </section>
    </div>
  );
};

export default Home;