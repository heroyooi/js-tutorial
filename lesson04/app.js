// 1) reduce – 합계 구하기
export function runTask1() {
  const nums = [1000, 2500, 3000];
  const sum = nums.reduce((acc, cur) => acc + cur, 0);

  console.clear();
  console.log(sum); // 6500

  document.getElementById('out-task1').textContent =
    `배열: ${nums.join(', ')}\n합계: ${sum}`;
}

// 2) some – 포함 여부 확인
export function runTask2() {
  const fruits = ["apple", "orange", "banana"];
  const hasBanana = fruits.some(f => f === "banana");

  console.clear();
  console.log(hasBanana); // true

  document.getElementById('out-task2').textContent =
    `배열: ${fruits.join(', ')}\n'banana' 포함 여부: ${hasBanana}`;
}

// 3) every – 전체 조건 검증
export function runTask3() {
  const scores = [90, 80, 70];
  const allPassed = scores.every(s => s >= 60);

  console.clear();
  console.log(allPassed); // true

  document.getElementById('out-task3').textContent =
    `점수: ${scores.join(', ')}\n모두 60점 이상?: ${allPassed}`;
}

// 4) find – 조건에 맞는 첫 번째 항목 찾기
export function runTask4() {
  const items = [
    { name: "연필", price: 500 },
    { name: "노트", price: 1000 },
    { name: "지우개", price: 1500 }
  ];
  const cheapItem = items.find(item => item.price <= 2000);

  console.clear();
  console.log(cheapItem);

  document.getElementById('out-task4').textContent =
    cheapItem
      ? `조건 만족 첫 상품: ${cheapItem.name} (${cheapItem.price}원)`
      : "조건을 만족하는 상품이 없습니다.";
}

// 버튼 이벤트 등록
document.getElementById('btn-task1')?.addEventListener('click', runTask1);
document.getElementById('btn-task2')?.addEventListener('click', runTask2);
document.getElementById('btn-task3')?.addEventListener('click', runTask3);
document.getElementById('btn-task4')?.addEventListener('click', runTask4);

