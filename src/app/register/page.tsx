"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import styles from "./register.module.css";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        await signIn("credentials", {
          email,
          password,
          callbackUrl: "/dashboard",
        });
      } else {
        const data = await res.json();
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.leftSection}>
        <Image
          src="/login_logo-rebg.png"
          alt="Illustration"
          width={500}
          height={500}
          className={styles.illustration}
        />
        <h2 className={styles.leftTitle}>Join the finance revolution.</h2>
        <p className={styles.leftSubtitle}>
          Create your free account and start budgeting today.
        </p>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.card}>
          <div className={styles.logo}>✳️</div>
          <h2 className={styles.heading}>Create your Account</h2>
          <p className={styles.subheading}>
            Begin managing your money the smart way
          </p>

          <button className={styles.googleButton} onClick={handleGoogleLogin}>
            <Image
              src="/google_logo.png"
              alt="Google logo"
              width={20}
              height={20}
              className={styles.googleIcon}
            />
            Continue with Google
          </button>

          <div className={styles.divider}>or Sign up with Email</div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
            />

            {error && <p className={styles.error}>{error}</p>}

            <button type="submit" className={styles.loginButton} disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className={styles.footerText}>
            Already have an account?{" "}
            <Link href="/login">
              <span className={styles.link}>Login here</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
