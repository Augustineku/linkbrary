import React, { useState } from "react";
import styles from "./Login.module.css";

const TEAM_ID = "19-13";
const API_URL = `https://linkbrary-api.vercel.app/${TEAM_ID}/auth/sign-in`;

const Login = () => {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login attempt with:", { email, password });
    setError("");
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          data.message || data.error || "로그인에 실패했습니다.";
        throw new Error(errorMessage);
      }

      setToken(data.accessToken);
      localStorage.setItem("authToken", data.accessToken);
      window.location.href = "/folder";
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h1 className={styles.logo}>Linkbrary</h1>
        <p className={styles.subtitle}>
          회원이 아니신가요!{" "}
          <a href="/signup" className={styles.registerLink}>
            회원 가입하기
          </a>
        </p>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          {/* Email Input */}
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="이메일을 입력하세요!"
              required
            />
          </div>

          {/* Password Input */}
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="비밀번호를 입력하세요!"
              required
            />
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>
        {error && <p className={styles.errorMessage}>{error}</p>}

        <p className={styles.registerText}>
          소셜 로그인{" "}
          <a href="/signup" className={styles.registerLink}>
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
