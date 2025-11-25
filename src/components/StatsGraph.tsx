"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface StatsGraphProps {
  income: number;
  expenses: number;
}

export default function StatsGraph({ income, expenses }: StatsGraphProps) {
  const data = [
    { name: "Income", amount: income },
    { name: "Expenses", amount: expenses },
  ];

  return (
    <div style={{
      width: "100%",
      maxWidth: "800px",
      margin: "2rem auto",
      padding: "1.5rem",
      backgroundColor: "#ffffff",
      borderRadius: "1rem",
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)"
    }}>
      <h2 style={{
        fontSize: "1.25rem",
        fontWeight: "600",
        marginBottom: "1rem",
        color: "#1f2937"
      }}>
        Income vs Expenses
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#60a5fa" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
