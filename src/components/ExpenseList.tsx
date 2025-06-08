"use client";
import { useState } from "react";

import styles from "@/styles/ExpenseList.module.css";

interface Expense {
  _id: string;
  title: string;
  amount: number;
  category: string;
  createdAt?: string;
  userId?: string;
}

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
  onEdit: (updated: Expense) => void;
}

export default function ExpenseList({
  expenses,
  onDelete,
  onEdit,
}: ExpenseListProps) {
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState({
    title: "",
    amount: "",
    category: "Other",
  });
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleEditClick = (exp: Expense) => {
    setEditId(exp._id);
    setEditData({
      title: exp.title,
      amount: exp.amount.toString(),
      category: exp.category,
    });
  };

  const handleEditSubmit = async () => {
    try {
      setLoadingId(editId);
      const res = await fetch("/api/expenses/edit", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editId, ...editData }),
      });

      if (!res.ok) throw new Error("Failed to update");
      const updated = await res.json();
      onEdit(updated);
      setEditId(null);
    } catch (err) {
      alert("Failed to update expense.");
    } finally {
      setLoadingId(null);
    }
  };

  const sortedExpenses = [...expenses].sort((a, b) => {
    if (sortBy === "amount") return b.amount - a.amount;
    return (
      new Date(b.createdAt || "").getTime() -
      new Date(a.createdAt || "").getTime()
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles.sortControls}>
        <strong className={styles.sortLabel}>Sort by:</strong>
        <button
          className={`${styles.sortButton} ${
            sortBy === "date" ? styles.active : ""
          }`}
          onClick={() => setSortBy("date")}
        >
          Date
        </button>
        <button
          className={`${styles.sortButton} ${
            sortBy === "amount" ? styles.active : ""
          }`}
          onClick={() => setSortBy("amount")}
        >
          Amount
        </button>
      </div>

      <ul className={styles.expenseList}>
        {sortedExpenses.length === 0 && (
          <li className={styles.emptyMessage}>No expenses found.</li>
        )}

        {sortedExpenses.map((exp) =>
          editId === exp._id ? (
            <li key={exp._id} className={styles.expenseItem}>
              <input
                className={styles.input}
                placeholder="Title"
                value={editData.title}
                onChange={(e) =>
                  setEditData({ ...editData, title: e.target.value })
                }
              />
              <input
                className={styles.input}
                type="number"
                placeholder="Amount"
                value={editData.amount}
                onChange={(e) =>
                  setEditData({ ...editData, amount: e.target.value })
                }
              />
              <select
                className={styles.select}
                value={editData.category}
                onChange={(e) =>
                  setEditData({ ...editData, category: e.target.value })
                }
              >
                {[
                  "Food",
                  "Transport",
                  "Shopping",
                  "Bills",
                  "Entertainment",
                  "Other",
                ].map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <button
                className={styles.saveButton}
                onClick={handleEditSubmit}
                disabled={loadingId === exp._id}
              >
                {loadingId === exp._id ? "Saving..." : "Save"}
              </button>
              <button
                className={styles.cancelButton}
                onClick={() => setEditId(null)}
              >
                Cancel
              </button>
            </li>
          ) : (
            <li key={exp._id} className={styles.expenseItem}>
              <div className={styles.expenseInfo}>
                <span className={styles.title}>{exp.title}</span>
                <span className={styles.category}>({exp.category})</span>
              </div>
              <div className={styles.amount}>₹{exp.amount.toFixed(2)}</div>
              <div className={styles.actions}>
                <button
                  className={styles.editButton}
                  onClick={() => handleEditClick(exp)}
                  aria-label={`Edit expense ${exp.title}`}
                >
                  Edit
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() =>
                    confirm("Are you sure you want to delete this expense?") &&
                    onDelete(exp._id)
                  }
                  aria-label={`Delete expense ${exp.title}`}
                >
                  Delete
                </button>
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
