"use client";

import styles from "@/styles/CategoryFilter.module.css";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className={styles.container}>
      <strong className={styles.title}>Filter by Category</strong>
      <div className={styles.buttonGroup}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`${styles.button} ${
              selectedCategory === cat ? styles.selected : ""
            }`}
            aria-pressed={selectedCategory === cat}
            type="button"
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
