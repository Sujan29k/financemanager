"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react"; // Import signOut
import ExpenseList from "@/components/ExpenseList";

interface Expense {
  _id: string;
  title: string;
  amount: number;
}

export default function ViewExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [income, setIncome] = useState<number>(0);
  const [incomeInput, setIncomeInput] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      try {
        const expenseRes = await fetch("/api/expenses/view");
        if (!expenseRes.ok) throw new Error("Failed to fetch expenses");
        const expenseData = await expenseRes.json();
        setExpenses(expenseData);

        const incomeRes = await fetch("/api/income");
        if (!incomeRes.ok) throw new Error("Failed to fetch income");
        const incomeData = await incomeRes.json();
        setIncome(incomeData.income || 0);
        setIncomeInput((incomeData.income || 0).toString());
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const totalExpenses = expenses.reduce((acc, item) => acc + item.amount, 0);
  const remaining = income - totalExpenses;

  async function handleIncomeSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsedIncome = Number(incomeInput);
    if (isNaN(parsedIncome) || parsedIncome < 0) {
      alert("Please enter a valid income amount");
      return;
    }

    try {
      const res = await fetch("/api/income", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ income: parsedIncome }),
      });

      if (!res.ok) throw new Error("Failed to update income");

      setIncome(parsedIncome);
      alert("Income updated successfully!");
    } catch (error) {
      console.error("Error updating income:", error);
      alert("There was an error updating your income");
    }
  }

  return (
    <div>
      {/* Logout Button */}
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
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

      <h2>Your Dashboard</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <form onSubmit={handleIncomeSubmit} style={{ marginBottom: "1rem" }}>
            <label htmlFor="income">Enter your Income: </label>
            <input
              type="number"
              id="income"
              value={incomeInput}
              onChange={(e) => setIncomeInput(e.target.value)}
              min="0"
              step="0.01"
              required
            />
            <button type="submit" style={{ marginLeft: "0.5rem" }}>
              Save Income
            </button>
          </form>

          <p>
            <strong>Income:</strong> ₹{income}
          </p>
          <p>
            <strong>Total Expenses:</strong> ₹{totalExpenses}
          </p>
          <p>
            <strong>Remaining Balance:</strong> ₹{remaining}
          </p>

          <ExpenseList expenses={expenses} />
        </>
      )}
    </div>
  );
}
