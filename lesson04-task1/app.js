const input = document.getElementById("score");
const result = document.getElementById("result");

function validateScore(raw) {
  const n = Number(raw);
  if (Number.isNaN(n) || n < 0 || n > 100) {
    throw new Error("0~100 사이의 숫자를 입력하세요.");
  }
  return n;
}

function gradeIfElse(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

function gradeSwitch(score) {
  // 10으로 나눠 몫 기준으로 분기(가독성 확보)
  switch (Math.floor(score / 10)) {
    case 10:
    case 9: return "A";
    case 8: return "B";
    case 7: return "C";
    case 6: return "D";
    default: return "F";
  }
}

document.getElementById("btnIf").addEventListener("click", () => {
  try {
    const s = validateScore(input.value);
    const g = gradeIfElse(s);
    result.textContent = `if/else → 점수 ${s}점, 학점 ${g}`;
  } catch (e) {
    result.textContent = e.message;
  }
});

document.getElementById("btnSwitch").addEventListener("click", () => {
  try {
    const s = validateScore(input.value);
    const g = gradeSwitch(s);
    result.textContent = `switch → 점수 ${s}점, 학점 ${g}`;
  } catch (e) {
    result.textContent = e.message;
  }
});

