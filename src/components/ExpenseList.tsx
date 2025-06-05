"use client";
import { useState } from "react";

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
    <div>
      <div style={{ marginBottom: "1rem" }}>
        <strong>Sort by:</strong>{" "}
        <button onClick={() => setSortBy("date")}>Date</button>{" "}
        <button onClick={() => setSortBy("amount")}>Amount</button>
      </div>
      <ul>
        {sortedExpenses.map((exp) =>
          editId === exp._id ? (
            <li key={exp._id}>
              <input
                value={editData.title}
                onChange={(e) =>
                  setEditData({ ...editData, title: e.target.value })
                }
              />
              <input
                type="number"
                value={editData.amount}
                onChange={(e) =>
                  setEditData({ ...editData, amount: e.target.value })
                }
              />
              <select
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
              <button onClick={handleEditSubmit}>
                {loadingId === exp._id ? "Saving..." : "Save"}
              </button>
              <button onClick={() => setEditId(null)}>Cancel</button>
            </li>
          ) : (
            <li key={exp._id}>
              {exp.title} - ₹{exp.amount} ({exp.category}){" "}
              <button onClick={() => handleEditClick(exp)}>Edit</button>{" "}
              <button
                onClick={() => confirm("Are you sure?") && onDelete(exp._id)}
              >
                Delete
              </button>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
