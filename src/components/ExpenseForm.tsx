"use client";

import { useState } from "react";
import styles from "@/styles/ExpenseForm.module.css";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react"; // Optional: install lucide-react or replace with ➡️

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
    } catch {
      setError("Error adding expense");
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={styles.imageHeader} />
      <h2 className={styles.formTitle}>New expense</h2>
      <p className={styles.formSubtitle}>What did you spend on today?</p>

      <input
        name="title"
        placeholder="Order from Swiggy"
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

      <button type="submit">
        Add expense <ArrowRight size={18} />
      </button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
};

export default ExpenseForm;
