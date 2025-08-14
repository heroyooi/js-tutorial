document.getElementById("gradeBtn").addEventListener("click", () => {
  const score = Number(document.getElementById("score").value);
  const result = document.getElementById("gradeResult");

  if (Number.isNaN(score) || score < 0 || score > 100) {
    result.textContent = "0~100 사이의 숫자를 입력하세요.";
    return;
  }

  let grade;
  if (score >= 90) grade = "A";
  else if (score >= 80) grade = "B";
  else if (score >= 70) grade = "C";
  else if (score >= 60) grade = "D";
  else grade = "F";

  result.textContent = `점수: ${score} → 학점: ${grade}`;
});