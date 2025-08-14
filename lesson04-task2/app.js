let currentUser = null;

function setStatus(text) {
  document.getElementById("status").textContent = `상태: ${text}`;
}

function login(email, pw) {
  // Guard Clause로 빠른 예외 처리
  if (!email || !pw) return { ok: false, msg: "이메일/비밀번호를 입력하세요." };
  if (!email.includes("@")) return { ok: false, msg: "이메일 형식이 올바르지 않습니다." };
  if (pw.length < 4) return { ok: false, msg: "비밀번호는 4자 이상이어야 합니다." };

  // 데모용: 모든 입력을 성공 처리
  currentUser = { email, role: "user" };
  return { ok: true, msg: `${email}님 환영합니다!` };
}

function logout() {
  if (!currentUser) return { ok: false, msg: "이미 로그아웃 상태입니다." };
  currentUser = null;
  return { ok: true, msg: "로그아웃 되었습니다." };
}

document.getElementById("login").addEventListener("click", () => {
  const email = document.getElementById("email").value.trim();
  const pw = document.getElementById("pw").value;
  const res = login(email, pw);
  setStatus(res.msg);
});

document.getElementById("logout").addEventListener("click", () => {
  const res = logout();
  setStatus(res.msg);
});

