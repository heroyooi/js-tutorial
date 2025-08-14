// 도우미: 입력 문자열을 JS 값으로 해석해보기 (간단 변환)
// "null"->null, "undefined"->undefined, "true"/"false"->boolean, 순수 숫자 문자열->number
function parseLoose(value) {
  const trimmed = value.trim();
  if (trimmed === "null") return null;
  if (trimmed === "undefined") return undefined;
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (trimmed !== "" && !Number.isNaN(Number(trimmed))) return Number(trimmed);
  return value; // 그대로 문자열
}

// ① 산술
const a = document.getElementById("a");
const b = document.getElementById("b");
const arithResult = document.getElementById("arithResult");
document.getElementById("calcBtn").addEventListener("click", () => {
  const x = Number(a.value);
  const y = Number(b.value);
  if (Number.isNaN(x) || Number.isNaN(y)) {
    arithResult.textContent = "숫자를 입력해 주세요.";
    return;
  }
  const sum = x + y;
  const diff = x - y;
  const prod = x * y;
  const quot = x / y; // y=0이면 Infinity 가능
  const mod = x % y;  // y=0이면 NaN
  const pow = x ** y;

  // 부동소수 예시 로그
  console.log("0.1 + 0.2 =", 0.1 + 0.2);

  arithResult.textContent =
    `+ = ${sum},  - = ${diff},  * = ${prod},  / = ${quot},  % = ${mod},  ** = ${pow}`;
});

// ② 비교
const left = document.getElementById("left");
const right = document.getElementById("right");
const cmpResult = document.getElementById("cmpResult");

document.getElementById("eqBtn").addEventListener("click", () => {
  const L = parseLoose(left.value);
  const R = parseLoose(right.value);
  cmpResult.textContent = `(${JSON.stringify(L)}) == (${JSON.stringify(R)}) → ${L == R}`;
});

document.getElementById("seqBtn").addEventListener("click", () => {
  const L = parseLoose(left.value);
  const R = parseLoose(right.value);
  cmpResult.textContent = `(${JSON.stringify(L)}) === (${JSON.stringify(R)}) → ${L === R}`;
});

document.getElementById("ltBtn").addEventListener("click", () => {
  const L = parseLoose(left.value);
  const R = parseLoose(right.value);
  cmpResult.textContent = `(${JSON.stringify(L)}) < (${JSON.stringify(R)}) → ${L < R}`;
});

document.getElementById("gtBtn").addEventListener("click", () => {
  const L = parseLoose(left.value);
  const R = parseLoose(right.value);
  cmpResult.textContent = `(${JSON.stringify(L)}) > (${JSON.stringify(R)}) → ${L > R}`;
});

// ③ 논리/Nullish/부정
const maybe = document.getElementById("maybe");
const logicResult = document.getElementById("logicResult");

document.getElementById("orBtn").addEventListener("click", () => {
  const A = parseLoose(maybe.value);
  const out = A || "기본";
  logicResult.textContent = `A || "기본" → ${JSON.stringify(out)}  (A=${JSON.stringify(A)})`;
});

document.getElementById("nullishBtn").addEventListener("click", () => {
  const A = parseLoose(maybe.value);
  const out = (A ?? "기본");
  logicResult.textContent = `A ?? "기본" → ${JSON.stringify(out)}  (A=${JSON.stringify(A)})`;
});

document.getElementById("notBtn").addEventListener("click", () => {
  const A = parseLoose(maybe.value);
  logicResult.textContent = `!A → ${!A}  (truthy/falsy 판단 참고)`;
});

// ④ 삼항
const score = document.getElementById("score");
const ternaryResult = document.getElementById("ternaryResult");
document.getElementById("gradeBtn").addEventListener("click", () => {
  const s = Number(score.value);
  if (Number.isNaN(s) || s < 0 || s > 100) {
    ternaryResult.textContent = "0~100 사이 점수를 입력하세요.";
    return;
  }
  const grade = s >= 90 ? "A" : s >= 80 ? "B" : s >= 70 ? "C" : s >= 60 ? "D" : "F";
  ternaryResult.textContent = `점수: ${s} → 학점: ${grade}`;
});

