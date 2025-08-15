// 1. let / const 구분하기
export function runTask1() {
  let age = 30;               // 변경 가능
  const name = "성연욱";       // 변경 불가능

  console.clear();
  console.log(`이름: ${name}, 나이: ${age}`);

  age = 31; // 가능
  console.log(`변경된 나이: ${age}`);

  // name = "홍길동"; // ❌ const 변수 재할당 불가

  document.getElementById('out-task1').innerHTML = `
    이름: ${name}<br>
    나이: ${age}
  `;
}

// 2. 템플릿 리터럴 응용
export function runTask2() {
  const userName = "민수";
  const userAge = 28;

  const message = `저는 ${userName}이고, 나이는 ${userAge}입니다.`;

  console.clear();
  console.log(message);

  document.getElementById('out-task2').textContent = message;
}

// 3. 화살표 함수 변환
export function runTask3() {
  // 기존 함수
  function multiply(a, b) {
    return a * b;
  }

  // 화살표 함수
  const multiplyArrow = (a, b) => a * b;

  const res1 = multiply(3, 4);
  const res2 = multiplyArrow(3, 4);

  console.clear();
  console.log("multiply(3,4) =", res1);
  console.log("multiplyArrow(3,4) =", res2);

  document.getElementById('out-task3').innerHTML = `
    multiply(3,4) = ${res1}<br>
    multiplyArrow(3,4) = ${res2}
  `;
}

// 버튼 이벤트 등록
document.getElementById('btn-task1')?.addEventListener('click', runTask1);
document.getElementById('btn-task2')?.addEventListener('click', runTask2);
document.getElementById('btn-task3')?.addEventListener('click', runTask3);