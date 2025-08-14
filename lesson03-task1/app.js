const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2");
const result = document.getElementById("result");

document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", () => {
    const a = Number(num1.value);
    const b = Number(num2.value);
    const op = btn.dataset.op;

    if (Number.isNaN(a) || Number.isNaN(b)) {
      result.textContent = "숫자를 입력하세요.";
      return;
    }
    if (op === "/" && b === 0) {
      result.textContent = "0으로 나눌 수 없습니다.";
      return;
    }
    result.textContent = `${a} ${op} ${b} = ${eval(`${a} ${op} ${b}`)}`;
  });
});

