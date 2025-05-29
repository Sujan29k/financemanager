"use client";

import { useState } from "react";
import styles from "@/styles/ExpenseForm.module.css";
import { useRouter } from "next/navigation";

const ExpenseForm = () => {
  const [form, setForm] = useState({ title: "", amount: "", date: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

      setForm({ title: "", amount: "", date: "" });
      router.push("/dashboard"); // Navigate to dashboard after adding
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
      <button type="submit">Add</button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
};

export default ExpenseForm;
