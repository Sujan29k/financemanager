import styles from "@/styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Finance Manager</h1>
      <p>Track your expenses easily.</p>
      <div className={styles.links}>
        <Link href="/add-expense" className={styles.button}>Add Expense</Link>
        <Link href="/view-expense" className={styles.button}>View Expenses</Link>
      </div>
    </div>
  );
}
