"use client";

import styles from "@/styles/Home.module.css";
import Header from "@/components/Header";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.container}>
        {/* Hero Section */}
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.badge}>✨ Smart Finance Management</div>
            <h1 className={styles.title}>
              Take Control of Your
              <span className={styles.gradientText}> Financial Future</span>
            </h1>
            <p className={styles.subtitle}>
              Track expenses, analyze spending patterns, and make smarter
              financial decisions with our intuitive dashboard and powerful
              insights.
            </p>
            <div className={styles.buttons}>
              <Link href="/dashboard" className={styles.buttonPrimary}>
                <span>Get Started</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M7.5 15L12.5 10L7.5 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link href="/register" className={styles.buttonSecondary}>
                <span>Sign Up Free</span>
              </Link>
            </div>
            <div className={styles.stats}>
              <div className={styles.statItem}>
                <div className={styles.statValue}>10K+</div>
                <div className={styles.statLabel}>Active Users</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statValue}>$2M+</div>
                <div className={styles.statLabel}>Money Tracked</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statValue}>4.9★</div>
                <div className={styles.statLabel}>User Rating</div>
              </div>
            </div>
          </div>
          <div className={styles.heroImageWrapper}>
            <div className={styles.imageGlow}></div>
            <Image
              src="/main_image.jpeg"
              alt="Finance Dashboard"
              width={650}
              height={500}
              className={styles.heroImage}
              priority
            />
          </div>
        </div>

        {/* Features Section */}
        <div className={styles.features}>
          <div className={styles.featuresHeader}>
            <span className={styles.featuresBadge}>Features</span>
            <h2 className={styles.featuresTitle}>
              Everything You Need to Manage Money
            </h2>
            <p className={styles.featuresSubtitle}>
              Powerful tools designed to give you complete control over your
              finances
            </p>
          </div>
          <div className={styles.cardsContainer}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>📊</div>
              <h3 className={styles.cardTitle}>Visual Dashboard</h3>
              <p className={styles.cardDescription}>
                Get instant insights with beautiful graphs and charts to
                understand your spending patterns at a glance.
              </p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>🧾</div>
              <h3 className={styles.cardTitle}>Smart Tracking</h3>
              <p className={styles.cardDescription}>
                Effortlessly track income, expenses, and savings with
                intelligent categorization and real-time updates.
              </p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>🔒</div>
              <h3 className={styles.cardTitle}>Secure & Private</h3>
              <p className={styles.cardDescription}>
                Your financial data is protected with bank-level encryption and
                advanced security measures.
              </p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>📅</div>
              <h3 className={styles.cardTitle}>Advanced Filters</h3>
              <p className={styles.cardDescription}>
                Find any transaction instantly with powerful filters by
                category, date range, or amount.
              </p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>💰</div>
              <h3 className={styles.cardTitle}>Budget Planning</h3>
              <p className={styles.cardDescription}>
                Set monthly budgets and receive alerts when you&apos;re
                approaching your spending limits.
              </p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>📱</div>
              <h3 className={styles.cardTitle}>Multi-Device Sync</h3>
              <p className={styles.cardDescription}>
                Access your financial data seamlessly across all your devices
                with automatic synchronization.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>
              Ready to Transform Your Finances?
            </h2>
            <p className={styles.ctaSubtitle}>
              Join thousands of users who have already taken control of their
              financial future
            </p>
            <div className={styles.ctaButtons}>
              <Link href="/register" className={styles.ctaButtonPrimary}>
                Start Free Today
              </Link>
              <Link href="/login" className={styles.ctaButtonSecondary}>
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
