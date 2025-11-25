"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

interface Expense {
  category: string;
  amount: number;
}

interface Props {
  expenses: Expense[];
}

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#00C49F",
  "#FFBB28",
  "#FF6666",
];

export default function CategoryPieChart({ expenses }: Props) {
  const categoryTotals: { [key: string]: number } = {};

  expenses.forEach(({ category, amount }) => {
    categoryTotals[category] = (categoryTotals[category] || 0) + amount;
  });

  const data = Object.keys(categoryTotals).map((category) => ({
    name: category,
    value: categoryTotals[category],
  }));

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "400px",
        padding: "1.5rem",
        backgroundColor: "#ffffff",
        borderRadius: "1rem",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2
        style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem" }}
      >
        Expense by Category
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
