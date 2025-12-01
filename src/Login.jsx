import React, { useState } from "react";
import styles from "./Login.module.css"; // CSS Modules import

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt with:", { email, password });
    // 여기에 실제 로그인 로직 (API 호출 등)을 구현합니다.
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h1 className={styles.logo}>Linkbrary</h1>
        <p className={styles.subtitle}>
          회원이 아니신가요!
          <a href="/register" className={styles.registerLink}>
            회원가입하기
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
              placeholder="Enter your email"
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
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className={styles.submitButton}>
            로그인
          </button>
        </form>

        {/* Social Login / Divider */}
        <div className={styles.divider}>
          <hr className={styles.line} />
          <span className={styles.text}>OR</span>
          <hr className={styles.line} />
        </div>

        {/* Google/Social Login Button */}
        <button className={styles.socialButton}>
          {/* 실제로는 여기에 Google G 아이콘을 넣습니다 */}
          <span
            role="img"
            aria-label="Google icon"
            className={styles.socialIcon}
          >
            G
          </span>
          Sign in with Google
        </button>

        {/* Register Link */}
        <p className={styles.registerText}>
          소셜로그인{" "}
          <a href="/register" className={styles.registerLink}>
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;

// function Login() {
//   const submit = (formData) => {
//     const username = formData.get("username");
//     const password = formData.get("password");
//     console.log(username, password);
//   };

//   return (
//     <form action={submit}>
//       <h1>LINKBRARY</h1>
//       <h4>회원이 아니신가요? 회원가입하기</h4>
//       <br></br>
//       <h6>이메일</h6>
//       <input name="email" placeholder="codeit@codeit.co.kr" />
//       <br></br>
//       <h6>비밀번호</h6>
//       <input name="password" placeholder="password" />
//       <br></br>
//       <button>로그인</button>
//       <br></br>
//       <h6>소셜 로그인</h6>
//     </form>
//   );
// }

// export default Login;
