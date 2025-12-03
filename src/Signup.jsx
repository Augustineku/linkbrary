import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios"; //
import styles from "./Signup.module.css"; // CSS Modules import

// API 정보 설정
const TEAM_ID = "19-10";
const SIGN_UP_URL = `https://linkbrary-api.vercel.app/${TEAM_ID}/auth/sign-up`;

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    isEmailChecked: false,
    name: "",
    isNameChecked: false,
    password: "",
    confirmPassword: "",
  });

  // 유효성 검사 상태
  const [validation, setValidation] = useState({
    emailValid: true,
    passwordMatch: true,
    isSubmitting: false, // 💡 API 호출 중 상태 추가
  });

  // 사용자 메시지 상태 (alert() 대체)
  const [message, setMessage] = useState({ text: "", type: "" });

  // 메시지 표시 함수
  const showMessage = useCallback((text, type) => {
    setMessage({ text, type });
    // 5초 후 메시지 초기화
    setTimeout(() => setMessage({ text: "", type: "" }), 5000);
  }, []);

  // 입력 값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    // 값이 변경되면 중복 확인 상태를 초기화
    if (name === "email") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        isEmailChecked: false,
      }));
      setValidation((prev) => ({ ...prev, emailValid: true }));
    } else if (name === "name") {
      setFormData((prev) => ({ ...prev, [name]: value, isNameChecked: false }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // 이메일 중복 확인 (Mock Function - 실제로는 API 호출 필요)
  const handleCheckEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(formData.email);

    setValidation((prev) => ({ ...prev, emailValid: isValid }));

    if (isValid) {
      // 💡 TODO: 이메일 중복 확인 API 호출 로직 구현 필요
      // 현재는 임시 성공 처리
      // 주의: 실제 환경에서는 alert 대신 커스텀 모달 UI를 사용해야 합니다.
      alert("사용 가능한 이메일입니다.");
      setFormData((prev) => ({ ...prev, isEmailChecked: true }));
    } else {
      alert("유효하지 않은 이메일 형식입니다.");
      setFormData((prev) => ({ ...prev, isEmailChecked: false }));
    }
  };

  // 이름 중복 확인 (Mock Function - 실제로는 API 호출 필요)
  const handleCheckName = () => {
    if (formData.name.length < 2) {
      alert("이름은 최소 2자 이상이어야 합니다.");
      setFormData((prev) => ({ ...prev, isNameChecked: false }));
      return;
    }

    // 💡 TODO: 이름 중복 확인 API 호출 로직 구현 필요
    // 현재는 임시 성공 처리
    // 주의: 실제 환경에서는 alert 대신 커스텀 모달 UI를 사용해야 합니다.
    alert("사용 가능한 이름입니다.");
    setFormData((prev) => ({ ...prev, isNameChecked: true }));
  };

  // 비밀번호 확인 검사
  React.useEffect(() => {
    if (
      formData.confirmPassword !== "" &&
      formData.password !== formData.confirmPassword
    ) {
      setValidation((prev) => ({ ...prev, passwordMatch: false }));
    } else {
      setValidation((prev) => ({ ...prev, passwordMatch: true }));
    }
  }, [formData.password, formData.confirmPassword]);

  // 폼 제출 핸들러 (API 요청 로직 추가됨)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. 클라이언트 측 최종 유효성 검사
    if (!validation.passwordMatch) {
      showMessage("비밀번호와 비밀번호 확인이 일치하지 않습니다.", "error");
      return;
    }
    if (!formData.isEmailChecked || !formData.isNameChecked) {
      showMessage("이메일과 이름 중복 확인을 완료해 주세요.", "error");
      return;
    }
    if (validation.isSubmitting) return; // 이중 제출 방지

    // API 호출 중 상태 설정
    setValidation((prev) => ({ ...prev, isSubmitting: true }));

    // 2. 최종 회원가입 API 요청 (fetch 사용으로 수정)
    try {
      const response = await fetch(SIGN_UP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          password: formData.password,
          email: formData.email,
        }),
      });

      const data = await response.json();

      if (response.ok && response.status === 201) {
        console.log("회원가입 성공:", data);
        showMessage(
          "회원가입이 성공적으로 완료되었습니다! 로그인 페이지로 이동합니다.",
          "success"
        );
        // 💡 TODO: 성공 후 로그인 페이지로 리다이렉트 (예: window.location.href = '/login')
      } else {
        // 서버 응답 에러 (예: 400 Bad Request, 중복 이메일 등)
        const errorMessage =
          data.message ||
          "회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.";
        console.error("회원가입 실패 (서버 응답):", data);
        showMessage(errorMessage, "error");
      }
    } catch (error) {
      // 네트워크 오류 또는 기타 예상치 못한 오류
      console.error("예상치 못한 오류:", error);
      showMessage(
        "네트워크 연결 또는 알 수 없는 오류가 발생했습니다.",
        "error"
      );
    } finally {
      // API 호출 완료 후 상태 해제
      setValidation((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  // 회원가입 버튼 활성화 조건
  const isFormValid =
    formData.email &&
    formData.name &&
    formData.password &&
    formData.confirmPassword &&
    formData.isEmailChecked &&
    formData.isNameChecked &&
    validation.passwordMatch;

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupCard}>
        <h1 className={styles.logo}>Linkbrary</h1>
        <p className={styles.subtitle}>
          이미 회원이신가요?{" "}
          <a href="/login" className={styles.loginLink}>
            로그인하기
          </a>
        </p>

        <form onSubmit={handleSubmit} className={styles.signupForm}>
          {/* Email Input */}
          <div
            className={`${styles.inputGroup} ${
              !validation.emailValid && styles.error
            }`}
          >
            <label htmlFor="email" className={styles.label}>
              이메일
            </label>
            <div className={styles.inputWithButton}>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() =>
                  setFormData((prev) => ({ ...prev, isEmailChecked: false }))
                } // 값 변경 시 재확인 필요
                className={`${styles.input} ${
                  formData.isEmailChecked ? styles.successBorder : ""
                }`}
                placeholder="이메일 주소"
                required
              />
              <button
                type="button"
                onClick={handleCheckEmail}
                className={`${styles.checkButton} ${
                  formData.isEmailChecked
                    ? styles.checkButtonSuccess
                    : styles.checkButtonDefault
                }`}
                disabled={!formData.email}
              >
                {formData.isEmailChecked ? "확인됨" : "중복확인"}
              </button>
            </div>
            {!validation.emailValid && (
              <p className={styles.errorMessage}>
                유효한 이메일 형식이 아닙니다.
              </p>
            )}
          </div>

          {/* Name Input */}
          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>
              이름
            </label>
            <div className={styles.inputWithButton}>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() =>
                  setFormData((prev) => ({ ...prev, isNameChecked: false }))
                } // 값 변경 시 재확인 필요
                className={`${styles.input} ${
                  formData.isNameChecked ? styles.successBorder : ""
                }`}
                placeholder="사용하실 이름"
                required
              />
              <button
                type="button"
                onClick={handleCheckName}
                className={`${styles.checkButton} ${
                  formData.isNameChecked
                    ? styles.checkButtonSuccess
                    : styles.checkButtonDefault
                }`}
                disabled={!formData.name}
              >
                {formData.isNameChecked ? "확인됨" : "중복확인"}
              </button>
            </div>
          </div>

          {/* Password Input */}
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
              placeholder="비밀번호"
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div
            className={`${styles.inputGroup} ${
              !validation.passwordMatch && styles.error
            }`}
          >
            <label htmlFor="confirmPassword" className={styles.label}>
              비밀번호 확인
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={styles.input}
              placeholder="비밀번호 다시 입력"
              required
            />
            {!validation.passwordMatch && (
              <p className={styles.errorMessage}>
                비밀번호가 일치하지 않습니다.
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={styles.submitButton}
            disabled={!isFormValid || validation.isSubmitting}
          >
            회원가입
          </button>
        </form>

        {/* Login Link */}
        <p className={styles.loginText}>
          이미 계정이 있으신가요?{" "}
          <a href="/login" className={styles.loginLink}>
            로그인
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
