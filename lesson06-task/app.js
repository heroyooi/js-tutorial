// 1) 온도 변환기
function cToF(celsius) {
  return (celsius * 9/5) + 32;
}
function fToC(fahrenheit) {
  return (fahrenheit - 32) * 5/9;
}

document.getElementById("convertBtn").addEventListener("click", () => {
  const value = Number(document.getElementById("tempValue").value);
  const type = document.getElementById("tempType").value;

  if (Number.isNaN(value)) {
    document.getElementById("tempResult").textContent = "유효한 숫자를 입력하세요.";
    return;
  }

  let result;
  if (type === "cToF") {
    result = `${cToF(value).toFixed(2)} ℉`;
  } else {
    result = `${fToC(value).toFixed(2)} ℃`;
  }
  document.getElementById("tempResult").textContent = result;
});

// 2) 배열 합계
function sumArray(arr) {
  return arr.reduce((acc, cur) => acc + cur, 0);
}

document.getElementById("sumBtn").addEventListener("click", () => {
  const numbers = [3, 6, 9, 12];
  const sum = sumArray(numbers);
  document.getElementById("sumResult").textContent = `합계: ${sum}`;
});

// 3) 문자열 포맷
function formatString(str, maxLength) {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + "...";
  }
  return str;
}

document.getElementById("formatBtn").addEventListener("click", () => {
  const str = document.getElementById("strValue").value;
  const length = Number(document.getElementById("strLength").value);

  if (!str) {
    document.getElementById("strResult").textContent = "문자열을 입력하세요.";
    return;
  }
  if (Number.isNaN(length) || length <= 0) {
    document.getElementById("strResult").textContent = "유효한 길이를 입력하세요.";
    return;
  }

  const formatted = formatString(str, length);
  document.getElementById("strResult").textContent = formatted;
});