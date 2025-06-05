"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import ExpenseList from "@/components/ExpenseList";
import Link from "next/link";

interface Expense {
  _id: string;
  title: string;
  amount: number;
  category: string;
}

export default function Dashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [income, setIncome] = useState<number>(0);
  const [incomeInput, setIncomeInput] = useState("");
  const [updatingIncome, setUpdatingIncome] = useState(false);

  const categories = [
    "All",
    "Food",
    "Transport",
    "Shopping",
    "Other",
    "Entertainment",
    "Bill",
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [expenseRes, incomeRes] = await Promise.all([
          fetch("/api/expenses/view"),
          fetch("/api/income"),
        ]);

        if (!expenseRes.ok) throw new Error("Failed to fetch expenses");
        if (!incomeRes.ok) throw new Error("Failed to fetch income");

        const expenseData = await expenseRes.json();
        setExpenses(expenseData);
        setFilteredExpenses(expenseData);

        const incomeData = await incomeRes.json();
        const userIncome = Number(incomeData.income) || 0;
        setIncome(userIncome);
        setIncomeInput(userIncome.toString());
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredExpenses(expenses);
    } else {
      setFilteredExpenses(expenses.filter((exp) => exp.category === category));
    }
  };

  const handleIncomeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsedIncome = Number(incomeInput);
    if (isNaN(parsedIncome) || parsedIncome < 0) {
      alert("Please enter a valid income amount");
      return;
    }

    try {
      setUpdatingIncome(true);
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
      alert("Error updating income");
    } finally {
      setUpdatingIncome(false);
    }
  };

  const totalExpenses = expenses.reduce((acc, item) => acc + item.amount, 0);
  const filteredTotal = filteredExpenses.reduce(
    (acc, item) => acc + item.amount,
    0
  );
  const remaining = income - totalExpenses;

  return (
    <div style={{ padding: "1rem" }}>
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
          {/* Income Form */}
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
            <button
              type="submit"
              style={{ marginLeft: "0.5rem" }}
              disabled={updatingIncome}
            >
              {updatingIncome ? "Updating..." : "Save Income"}
            </button>
          </form>

          {/* Summary */}
          {selectedCategory === "All" && (
            <>
              <p>
                <strong>Income:</strong> ₹{income}
              </p>
              <p>
                <strong>Total Expenses:</strong> ₹{totalExpenses}
              </p>
              <p>
                <strong>Remaining Balance:</strong> ₹{remaining}
              </p>
            </>
          )}

          {/* Filter Categories */}
          <div style={{ margin: "1rem 0" }}>
            <strong>Filter by Category:</strong>{" "}
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                style={{
                  margin: "0.25rem",
                  padding: "0.25rem 0.5rem",
                  backgroundColor:
                    selectedCategory === cat ? "#0070f3" : "#e0e0e0",
                  color: selectedCategory === cat ? "#fff" : "#000",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Expenses List */}
          <p>
            <strong>Total in {selectedCategory}:</strong> ₹
            {selectedCategory === "All" ? totalExpenses : filteredTotal}
          </p>

          <ExpenseList expenses={filteredExpenses} />
        </>
      )}

      <Link href="/profile">
        <button
          style={{
            marginBottom: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#2196f3",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          View Profile
        </button>
      </Link>
    </div>
  );
}
