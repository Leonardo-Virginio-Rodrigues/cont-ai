import Link from "next/link";
import styles from "@/styles/Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Finance Dashboard</h1>
      <nav>
        <ul className={styles.navList}>
          <li>
            <Link href="/CreateTransaction">
              <button className={styles.button}>Create Transaction</button>
            </Link>
          </li>
          <li>
            <Link href="/viewTransactions">
              <button className={styles.button}>View Transactions</button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
