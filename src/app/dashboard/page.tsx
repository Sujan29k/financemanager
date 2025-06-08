"use client";

import { useEffect, useState } from "react";
import ExpenseList from "@/components/ExpenseList";
import Headere from "@/components/Headere";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import IncomeInput from "@/components/IncomeInput";
import CategoryFilter from "@/components/CategoryFilter";
import StatsCard from "@/components/StatsCard";

import styles from "./dashboard.module.css";

interface Expense {
  _id: string;
  title: string;
  amount: number;
  category: string;
  date?: string;
}

export default function Dashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [income, setIncome] = useState<number>(0);
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");

  const categories = [
    "All",
    "Food",
    "Transport",
    "Shopping",
    "Entertainment",
    "Bill",
    "Other",
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
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered =
      selectedCategory === "All"
        ? [...expenses]
        : expenses.filter((exp) => exp.category === selectedCategory);

    if (sortBy === "date") {
      filtered.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    } else if (sortBy === "amount") {
      filtered.sort((a, b) => b.amount - a.amount);
    }

    setFilteredExpenses(filtered);
  }, [expenses, selectedCategory, sortBy]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/expenses/delete?id=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete expense");

      const updatedExpenses = expenses.filter((exp) => exp._id !== id);
      setExpenses(updatedExpenses);
    } catch (error) {
      console.error(error);
      alert("Failed to delete expense");
    }
  };

  const totalExpenses = expenses.reduce((acc, item) => acc + item.amount, 0);
  const filteredTotal = filteredExpenses.reduce(
    (acc, item) => acc + item.amount,
    0
  );
  const remaining = income - totalExpenses;

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />

      <div className={styles.mainContent}>
        <Headere income={income} />

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <IncomeInput income={income} setIncome={setIncome} />

            <div className={styles.statsCardsWrapper}>
              <StatsCard
                title="Total Income"
                value={`₹${income.toFixed(2)}`}
                color="green"
              />
              <StatsCard
                title="Total Expenses"
                value={`₹${totalExpenses.toFixed(2)}`}
                color="red"
              />
              <StatsCard
                title="Remaining Balance"
                value={`₹${remaining.toFixed(2)}`}
                color="blue"
              />
            </div>

            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />

            <div className={styles.sortContainer}>
              <label htmlFor="sort" className={styles.sortLabel}>
                Sort by:
              </label>
              <select
                id="sort"
                className={styles.sortSelect}
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value === "date" ? "date" : "amount")
                }
              >
                <option value="date">Date</option>
                <option value="amount">Amount</option>
              </select>
            </div>

            <ExpenseList
              expenses={filteredExpenses}
              onDelete={handleDelete}
              onEdit={(updated) => {
                const updatedList = expenses.map((exp) =>
                  exp._id === updated._id ? updated : exp
                );
                setExpenses(updatedList);
              }}
            />

            <Link href="/profile">
              <button className={styles.profileButton}>View Profile</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
