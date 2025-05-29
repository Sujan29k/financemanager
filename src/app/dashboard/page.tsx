"use client";

import { useEffect, useState } from "react";
import ExpenseList from "@/components/ExpenseList";

interface Expense {
  _id: string;
  title: string;
  amount: number;
}

export default function ViewExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExpenses() {
      try {
        const res = await fetch("/api/expenses/view");
        if (!res.ok) throw new Error("Failed to fetch expenses");
        const data = await res.json();
        setExpenses(data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchExpenses();
  }, []);

  return (
    <div>
      <h2>Your Expenses</h2>
      {loading ? <p>Loading...</p> : <ExpenseList expenses={expenses} />}
    </div>
  );
}
