import Link from "next/link";
import Image from "next/image";
import {
  FaSignOutAlt,
  FaWallet,
  FaChartPie,
  FaListUl,
  FaCog,
} from "react-icons/fa";
import { signOut } from "next-auth/react";
import styles from "@/styles/Sidebar.module.css";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div>
        {/* Logo */}
        <div className={styles.logo}>💸 FinanceHub</div>

        {/* User */}
        <div className={styles.userProfile}>
          <div
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "3px solid rgba(96, 165, 250, 0.5)",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Image
              src="/avatar.jpg"
              alt="Avatar"
              width={70}
              height={70}
              style={{ objectFit: "cover" }}
            />
          </div>
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
