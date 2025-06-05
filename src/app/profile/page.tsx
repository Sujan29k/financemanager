"use client";

import { useEffect, useState } from "react";
import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface UserProfile {
  name: string;
  email: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [income, setIncome] = useState<number>(0);
  const [expenses, setExpenses] = useState<number>(0);
  const [remaining, setRemaining] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    async function fetchProfile() {
      const session = await getSession();
      if (!session) {
        router.push("/login");
        return;
      }

      setUser({
        name: session.user?.name || "",
        email: session.user?.email || "",
      });

      try {
        const incomeRes = await fetch("/api/income");
        const incomeData = await incomeRes.json();
        const incomeVal = Number(incomeData.income) || 0;
        setIncome(incomeVal);

        const expenseRes = await fetch("/api/expenses/view");
        const expenseData = await expenseRes.json();

        // Safely handle different data structures
        const expenseArray = Array.isArray(expenseData)
          ? expenseData
          : expenseData.expenses || expenseData.data || [];

        const totalExp = expenseArray.reduce(
          (acc: number, item: any) => acc + (item.amount || 0),
          0
        );

        setExpenses(totalExp);
        setRemaining(incomeVal - totalExp);
      } catch (err) {
        console.error("Error fetching financial details:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [router]);

  if (loading || !user) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Profile Page</h1>

      <div style={{ marginBottom: "1rem" }}>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>

      <div>
        <p>
          <strong>Income:</strong> ₹{income}
        </p>
        <p>
          <strong>Total Expenses:</strong> ₹{expenses}
        </p>
        <p>
          <strong>Remaining Balance:</strong> ₹{remaining}
        </p>
      </div>

      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#f44336",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}
