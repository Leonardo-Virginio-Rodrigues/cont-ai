import Header from "@/components/Header";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>ContAi</h1>
      </main>
    </div>
  );
}
