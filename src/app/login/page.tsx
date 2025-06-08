"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./login.module.css";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error || "Invalid email or password");
    } else {
      router.push("/dashboard");
    }
  };

  const handleGoogleLogin = async () => {
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.leftSection}>
        <Image
          src="/login_logo-rebg.png" // Replace this with your own image
          alt="Illustration"
          width={500}
          height={500}
          className={styles.illustration}
        />
        <h2 className={styles.leftTitle}>Turn your ideas into reality.</h2>
        <p className={styles.leftSubtitle}>
          Start for free and get attractive offers from the community
        </p>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.card}>
          <div className={styles.logo}>✳️</div>
          <h2 className={styles.heading}>Login to your Account</h2>
          <p className={styles.subheading}>
            See what is going on with your finance
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

          <div className={styles.divider}>or Sign in with Email</div>

          <form onSubmit={handleLogin} className={styles.form}>
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

            <div className={styles.options}>
              <label>
                <input type="checkbox" /> Remember Me
              </label>
              <span className={styles.link}>Forgot Password?</span>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <button type="submit" className={styles.loginButton}>
              Login
            </button>
          </form>

          <p className={styles.footerText}>
            Not Registered Yet?{" "}
            <Link href="/register">
              <span className={styles.link}>Create an account</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
