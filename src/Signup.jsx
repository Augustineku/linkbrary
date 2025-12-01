import React, { useState } from "react";
import styles from "./Signup.module.css"; // CSS Modules import

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    isEmailChecked: false,
    nickname: "",
    isNicknameChecked: false,
    password: "",
    confirmPassword: "",
  });

  // 유효성 검사 상태
  const [validation, setValidation] = useState({
    emailValid: true,
    passwordMatch: true,
  });

  // 입력 값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 이메일 중복 확인 (Mock Function)
  const handleCheckEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(formData.email);

    setValidation((prev) => ({ ...prev, emailValid: isValid }));

    if (isValid) {
      // 실제 API 호출 로직: 이메일 중복 확인
      // 성공 시: setFormData(prev => ({ ...prev, isEmailChecked: true }));
      // 여기서는 임시로 성공 처리
      alert("사용 가능한 이메일입니다.");
      setFormData((prev) => ({ ...prev, isEmailChecked: true }));
    } else {
      alert("유효하지 않은 이메일 형식입니다.");
      setFormData((prev) => ({ ...prev, isEmailChecked: false }));
    }
  };

  // 닉네임 중복 확인 (Mock Function)
  const handleCheckNickname = () => {
    if (formData.nickname.length < 2) {
      alert("닉네임은 최소 2자 이상이어야 합니다.");
      setFormData((prev) => ({ ...prev, isNicknameChecked: false }));
      return;
    }

    // 실제 API 호출 로직: 닉네임 중복 확인
    // 성공 시: setFormData(prev => ({ ...prev, isNicknameChecked: true }));
    // 여기서는 임시로 성공 처리
    alert("사용 가능한 닉네임입니다.");
    setFormData((prev) => ({ ...prev, isNicknameChecked: true }));
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

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }
    if (!formData.isEmailChecked || !formData.isNicknameChecked) {
      alert("이메일과 닉네임 중복 확인을 완료해 주세요.");
      return;
    }

    // 최종 회원가입 로직 (API 호출 등)
    console.log("Signup successful:", formData);
    alert("회원가입이 완료되었습니다!");
  };

  // 회원가입 버튼 활성화 조건
  const isFormValid =
    formData.email &&
    formData.nickname &&
    formData.password &&
    formData.confirmPassword &&
    formData.isEmailChecked &&
    formData.isNicknameChecked &&
    validation.passwordMatch;

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupCard}>
        <h1 className={styles.logo}>Linkbrary</h1>
        <p className={styles.subtitle}>
          이미 회원이신가요?
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

          {/* Nickname Input */}
          <div className={styles.inputGroup}>
            <label htmlFor="nickname" className={styles.label}>
              닉네임
            </label>
            <div className={styles.inputWithButton}>
              <input
                type="text"
                id="nickname"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                onFocus={() =>
                  setFormData((prev) => ({ ...prev, isNicknameChecked: false }))
                } // 값 변경 시 재확인 필요
                className={`${styles.input} ${
                  formData.isNicknameChecked ? styles.successBorder : ""
                }`}
                placeholder="사용하실 닉네임"
                required
              />
              <button
                type="button"
                onClick={handleCheckNickname}
                className={`${styles.checkButton} ${
                  formData.isNicknameChecked
                    ? styles.checkButtonSuccess
                    : styles.checkButtonDefault
                }`}
                disabled={!formData.nickname}
              >
                {formData.isNicknameChecked ? "확인됨" : "중복확인"}
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
            disabled={!isFormValid}
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

// function Signup() {
//   const submit = (formData) => {
//     const username = formData.get("username");
//     const password = formData.get("password");
//     console.log(username, password);
//   };

//   return (
//     <form action={submit}>
//       <h1>LINKBRARY</h1>
//       <h3>이미 회원이신가요? 로그인하기</h3>
//       <br></br>
//       <h6>이메일</h6>
//       <input name="email" placeholder="이메일을 입력해주세요" />
//       <br></br>
//       <h6>이름</h6>
//       <input name="name" placeholder="홍길동" />
//       <br></br>
//       <h6>비밀번호</h6>
//       <input name="password" type="password" placeholder="linkbrary2025" />
//       <br></br>
//       <h6>비밀번호확인</h6>
//       <input name="veryfy" placeholder="linkbrary20256" />
//       <p>내용을 다시 작성해주세요</p>
//       <button>회원가입</button>
//     </form>
//   );
// }

// export default Signup;
