// ExpenseForm.tsx

"use client";

import { useState } from "react";
import styles from "@/styles/ExpenseForm.module.css";
import { useRouter } from "next/navigation";

const categories = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Entertainment",
  "Other",
];

const ExpenseForm = () => {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    date: "",
    category: "Other",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/expenses/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to add expense");

      setForm({ title: "", amount: "", date: "", category: "Other" });
      router.push("/dashboard");
    } catch (err) {
      setError("Error adding expense");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Add Expense</h2>
      <input
        name="title"
        placeholder="Title"
        onChange={handleChange}
        value={form.title}
        required
      />
      <input
        name="amount"
        type="number"
        placeholder="Amount"
        onChange={handleChange}
        value={form.amount}
        required
      />
      <input
        name="date"
        type="date"
        onChange={handleChange}
        value={form.date}
        required
      />

      <select
        name="category"
        onChange={handleChange}
        value={form.category}
        required
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <button type="submit">Add</button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
};

export default ExpenseForm;
