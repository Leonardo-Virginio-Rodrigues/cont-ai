import Link from "next/link";
import styles from "@/styles/Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/">
        <button className={styles.title}>Finance Dashboard</button>
      </Link>
      <nav>
        <ul className={styles.navList}>
          <li>
            <Link href="/CreateTransaction">
              <button className={styles.button}>Cadastrar Lançamento</button>
            </Link>
          </li>
          <li>
            <Link href="/FindTransactions">
              <button className={styles.button}>Ver Lançamentos</button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
