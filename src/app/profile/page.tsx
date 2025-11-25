"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FaUserCircle,
  FaMapMarkerAlt,
  FaUniversity,
  FaExchangeAlt,
  FaMoneyCheckAlt,
  FaFileInvoice,
  FaCog,
  FaQuestionCircle,
} from "react-icons/fa";
import styles from "./ProfilePage.module.css";

interface UserProfile {
  name: string;
  email: string;
  image?: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [income, setIncome] = useState<number>(0);
  const [expenses, setExpenses] = useState<number>(0);
  const [remaining, setRemaining] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Personal Details");
  const router = useRouter();

  // --- Fetch user + finance data on mount ---
  useEffect(() => {
    (async () => {
      const session = await getSession();
      if (!session) {
        router.push("/login");
        return;
      }
      setUser({
        name: session.user?.name || "",
        email: session.user?.email || "",
        image: session.user?.image || "",
      });

      try {
        const [incomeRes, expenseRes] = await Promise.all([
          fetch("/api/income"),
          fetch("/api/expenses/view"),
        ]);
        const incomeData = await incomeRes.json();
        const incomeVal = Number(incomeData.income) || 0;
        setIncome(incomeVal);

        const expenseData = await expenseRes.json();
        const expenseArr = Array.isArray(expenseData)
          ? expenseData
          : expenseData.expenses || expenseData.data || [];
        const totalExp = expenseArr.reduce(
          (sum: number, item: any) => sum + (item.amount || 0),
          0
        );
        setExpenses(totalExp);
        setRemaining(incomeVal - totalExp);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  // --- Handle avatar upload ---
  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    const preview = URL.createObjectURL(file);
    setUser((prev) => (prev ? { ...prev, image: preview } : prev));
    // TODO: Upload avatar to server here
  };

  if (loading || !user) return <p className={styles.loading}>Loading...</p>;

  return (
    <div className={styles.wrapper}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <Link href="/dashboard" className={styles.backLink}>
          ← Back to Home
        </Link>

        {/* Avatar + name */}
        <div className={styles.avatarBlock}>
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.image} alt="avatar" className={styles.avatar} />
          ) : (
            <div className={styles.defaultAvatar}>{user.name[0] || "U"}</div>
          )}
          <label className={styles.uploadLabel}>
            Change photo
            <input type="file" accept="image/*" onChange={handleAvatarChange} />
          </label>
          <p className={styles.userName}>{user.name}</p>
        </div>

        <ul className={styles.menuList}>
          <li
            onClick={() => setActiveTab("Personal Details")}
            className={`${styles.menuItem} ${
              activeTab === "Personal Details" ? styles.active : ""
            }`}
          >
            <FaUserCircle /> Personal Details
          </li>
          <li className={styles.menuItem}>
            <FaMapMarkerAlt /> Address Details
          </li>
          <li className={styles.menuItem}>
            <FaUniversity /> PAN &amp; Bank Details
          </li>
          <li className={styles.menuItem}>
            <FaExchangeAlt /> My Transactions
          </li>
          <li className={styles.menuItem}>
            <FaMoneyCheckAlt /> My Loans
          </li>
          <li className={styles.menuItem}>
            <FaFileInvoice /> Reports
          </li>
          <li className={styles.menuItem}>
            <FaCog /> Settings
          </li>
          <li className={styles.menuItem}>
            <FaQuestionCircle /> Customer Support
          </li>
        </ul>

        <button className={styles.logoutBtn} onClick={() => signOut()}>
          Log out
        </button>
      </aside>

      {/* Main content */}
      <main className={styles.main}>
        <h2 className={styles.sectionTitle}>{activeTab}</h2>

        {activeTab === "Personal Details" && (
          <div className={styles.detailGrid}>
            <div>
              <span className={styles.label}>First Name</span>
              <p className={styles.value}>{user.name.split(" ")[0]}</p>
            </div>
            <div>
              <span className={styles.label}>Last Name</span>
              <p className={styles.value}>
                {user.name.split(" ").slice(1).join(" ")}
              </p>
            </div>
            <div>
              <span className={styles.label}>Email</span>
              <p className={styles.value}>{user.email}</p>
            </div>
            <div>
              <span className={styles.label}>Mobile</span>
              <p className={styles.value}>+91‑9876543210</p>
            </div>
            <div>
              <span className={styles.label}>Income</span>
              <p className={styles.value}>₹{income}</p>
            </div>
            <div>
              <span className={styles.label}>Total Expenses</span>
              <p className={styles.value}>₹{expenses}</p>
            </div>
            <div>
              <span className={styles.label}>Remaining Balance</span>
              <p className={styles.value}>₹{remaining}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
