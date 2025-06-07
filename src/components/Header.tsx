"use client";

import styles from "@/styles/Header.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logoSection}>
        <Image
          src="/logo.png" // Replace with your logo path
          alt="Finance Manager Logo"
          width={40}
          height={40}
          className={styles.logo}
        />
        <span className={styles.title}>Finance Manager</span>
      </div>

      <nav className={styles.nav}>
        <Link href="/dashboard" className={styles.navLink}>
          📊 Dashboard
        </Link>
        <Link href="/profile" className={styles.navLink}>
          🙍‍♂️ Profile
        </Link>
        <Link href="/login" className={styles.authButton}>
          🔐 Login
        </Link>
        <Link href="/register" className={styles.authButtonPrimary}>
          📝 Register
        </Link>
      </nav>
    </header>
  );
}
