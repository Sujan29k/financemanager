import ExpenseForm from "@/components/ExpenseForm";

export default function AddExpensePage() {
  return (
    <main
      style={{
        backgroundColor: "#f5f7fa",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <ExpenseForm />
    </main>
  );
}
