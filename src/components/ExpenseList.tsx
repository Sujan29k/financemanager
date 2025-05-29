// ExpenseList.tsx

"use client";

interface Expense {
  _id: string;
  title: string;
  amount: number;
  category: string;
}

interface ExpenseListProps {
  expenses: Expense[];
}

export default function ExpenseList({ expenses }: ExpenseListProps) {
  return (
    <ul>
      {expenses.map((exp) => (
        <li key={exp._id}>
          {exp.title} - ₹{exp.amount} ({exp.category})
        </li>
      ))}
    </ul>
  );
}
