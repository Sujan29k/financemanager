import styles from "@/styles/StatsCard.module.css";

interface StatsCardProps {
  title: string;
  value: string;
  color: "green" | "red" | "blue";
}

export default function StatsCard({ title, value, color }: StatsCardProps) {
  return (
    <div className={`${styles.card} ${styles[color]}`}>
      <p className={styles.title}>{title}</p>
      <h2 className={styles.value}>{value}</h2>
    </div>
  );
}
