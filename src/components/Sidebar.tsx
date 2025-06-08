import Link from "next/link";
import { FaSignOutAlt, FaWallet, FaChartPie, FaListUl, FaCog } from "react-icons/fa";
import { signOut } from "next-auth/react";
import styles from "@/styles/Sidebar.module.css";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
  <div>
    {/* Logo */}
    <div className={styles.logo}>💸 BudgetLab</div>

    {/* User */}
    <div className={styles.userProfile}>
      <img src="/avatar.jpg" alt="Avatar" className={styles.avatar} />
      <div className={styles.username}>John Doe</div>
    </div>

    {/* Nav */}
    <nav className={styles.navMenu}>
      <Link href="/dashboard" className={styles.sidebarItem}>
        <FaChartPie /> Dashboard
      </Link>
      <Link href="#" className={styles.sidebarItem}>
        <FaWallet /> Yields
      </Link>
      <Link href="#" className={styles.sidebarItem}>
        <FaListUl /> DEXes
      </Link>
      <Link href="#" className={styles.sidebarItem}>
        <FaCog /> Settings
      </Link>
    </nav>
  </div>

  {/* This logout button will now be pinned at the bottom */}
  <button
    className={styles.logoutBtn}
    onClick={() => signOut({ callbackUrl: "/login" })}
  >
    <FaSignOutAlt /> Log out
  </button>
</aside>

  );
}
