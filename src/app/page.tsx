"use client";

import styles from "@/styles/Home.module.css";
import Header from "@/components/Header";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Header />
      <main className={styles.container}>
        <div className={styles.hero}>
          <div className={styles.text}>
            <h1 className={styles.title}>Manage Your Finances</h1>
            <p className={styles.subtitle}>
              Visualize, plan, and optimize your spending habits.
            </p>
            <div className={styles.buttons}>
              <Link href="/add-expense" className={styles.buttonPrimary}>
                ➕ Add Expense
              </Link>
              <Link href="/view-expense" className={styles.buttonSecondary}>
                📊 View Expenses
              </Link>
            </div>
          </div>
          <div className={styles.imageWrapper}>
            <Image
              src="/main_image.jpeg"
              alt="Finance Illustration"
              width={800}
              height={500}
              className={styles.heroImage}
            />
          </div>
        </div>

        <div className={styles.features}>
  <h2 className={styles.featuresTitle}>Why Choose Us?</h2>
  <div className={styles.cardsContainer}>
    <div className={styles.card}>
      <h3>📊 Visual Dashboard</h3>
      <p>Get insights with graphs and charts to better understand your spending habits.</p>
    </div>
    <div className={styles.card}>
      <h3>🧾 Detailed Tracking</h3>
      <p>Track income, expenses, and savings effortlessly with categorized entries.</p>
    </div>
    <div className={styles.card}>
      <h3>🔒 Secure & Private</h3>
      <p>Your data is protected with top-tier encryption and local storage options.</p>
    </div>
    <div className={styles.card}>
      <h3>📅 Smart Filters</h3>
      <p>Filter transactions by category, date, or amount to find exactly what you need.</p>
    </div>
  </div>
</div>

      </main>
    </div>
  );
}
