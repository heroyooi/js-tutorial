// 1. 배열 구조 분해
export function runTask1() {
  const skills = ["HTML", "CSS", "JavaScript"];
  const [first, , third] = skills;

  console.clear();
  console.log(first); // HTML
  console.log(third); // JavaScript

  document.getElementById('out-task1').innerHTML = `
    첫 번째: ${first} <br>
    세 번째: ${third}
  `;
}

// 2. 객체 구조 분해
export function runTask2() {
  const item = { product: "노트북", price: 1500000 };
  const { product, price } = item;

  console.clear();
  console.log(`상품: ${product}, 가격: ${price}원`);

  document.getElementById('out-task2').textContent =
    `상품: ${product}, 가격: ${price}원`;
}

// 3. 기본값 + 변수 이름 변경
export function runTask3() {
  const person = { name: "영희" };
  const { name: userName, age = 20 } = person;

  console.clear();
  console.log(`이름: ${userName}, 나이: ${age}`);

  document.getElementById('out-task3').textContent =
    `이름: ${userName}, 나이: ${age}`;
}

// 버튼 이벤트 등록
document.getElementById('btn-task1')?.addEventListener('click', runTask1);
document.getElementById('btn-task2')?.addEventListener('click', runTask2);
document.getElementById('btn-task3')?.addEventListener('click', runTask3);