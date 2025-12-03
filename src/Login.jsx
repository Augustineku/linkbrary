import React, { useState } from "react";
import styles from "./Login.module.css"; // CSS Modules import

// Linkbrary API의 팀 ID. 실제 팀 ID로 변경하세요.
const TEAM_ID = "19-10";
const API_URL = `https://linkbrary-api.vercel.app/api/${TEAM_ID}/auth/sign-in`;

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

      const data = await response.json(); // 응답 본문을 먼저 읽음

      if (!response.ok) {
        // HTTP 상태 코드가 200 범위가 아닌 경우 처리
        throw new Error(data.message || "로그인 실패!"); // 읽어둔 데이터를 사용
      }

      // 성공 시 처리
      setToken(data.data.token); // 응답에서 토큰을 추출하여 저장
      localStorage.setItem("authToken", data.data.token); // 토큰을 로컬 스토리지에 저장
      window.location.href = "/folder";
    } catch (error) {
      setError(error.message); // 에러 메시지 설정
    } finally {
      setLoading(false); // 로딩 상태 해제
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

          {/* Submit Button */}
          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>
        {error && <p className={styles.errorMessage}>{error}</p>}

        {/* Register Link */}
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
