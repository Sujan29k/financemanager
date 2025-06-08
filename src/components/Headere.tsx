"use client";

import styles from "@/styles/Headere.module.css";

export default function Headere({ income }: { income: number }) {
  return (
    <header className={styles.header}>
      <h1 className={styles.heading}>Dashboard</h1>
      <span className={styles.incomeInfo}>
        Total Income: ₹{income.toFixed(2)}
      </span>
    </header>
  );
}
