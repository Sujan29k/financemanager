"use client";

import { useState, useEffect } from "react";

interface IncomeInputProps {
  income: number;
  setIncome: (income: number) => void;
}

export default function IncomeInput({ income, setIncome }: IncomeInputProps) {
  const [incomeInput, setIncomeInput] = useState(income.toString());
  const [updatingIncome, setUpdatingIncome] = useState(false);

  // Sync incomeInput whenever income prop changes
  useEffect(() => {
    setIncomeInput(income.toString());
  }, [income]);

  const handleSubmit = async (e: React.FormEvent) => {
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

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
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
  );
}
