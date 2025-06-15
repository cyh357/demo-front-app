export const required = (v) => !!v || "필수 입력 항목입니다.";

export const idFormat = (v) =>
  /^[a-z0-9]*$/.test(v) || "영문 소문자 및 숫자만 입력 가능합니다.";

export const minLength = (len) => (v) =>
  (v && v.length >= len) || `${len}자 이상 입력해주세요.`;

export const passwordComplexity = (v) =>
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(v) ||
  "비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.";

export const passwordMatch = (passwordRef) => (v) => {
  return v === passwordRef || "비밀번호가 일치하지 않습니다.";
};
