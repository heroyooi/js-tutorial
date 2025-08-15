// 1. 배열 복사
export function runTask1() {
  const arr = ["HTML", "CSS"];
  const arrCopy = [...arr]; // 배열 복사
  arrCopy.push("JavaScript");

  console.clear();
  console.log(arr);      // ["HTML", "CSS"]
  console.log(arrCopy);  // ["HTML", "CSS", "JavaScript"]

  document.getElementById('out-task1').textContent =
    `원본 배열: ${JSON.stringify(arr)}\n복사본: ${JSON.stringify(arrCopy)}`;
}

// 2. 객체 병합
export function runTask2() {
  const book = { title: "책" };
  const priceInfo = { price: 15000 };
  const mergedBook = { ...book, ...priceInfo };

  console.clear();
  console.log(mergedBook); // { title: "책", price: 15000 }

  document.getElementById('out-task2').textContent =
    JSON.stringify(mergedBook, null, 2);
}

// 3. 나머지 매개변수
export function runTask3() {
  function getMax(...numbers) {
    return Math.max(...numbers);
  }

  const r1 = getMax(10, 5, 20, 8);
  const r2 = getMax(1, 2, 3);

  console.clear();
  console.log("getMax(10, 5, 20, 8) =", r1);
  console.log("getMax(1, 2, 3) =", r2);

  document.getElementById('out-task3').textContent =
    `getMax(10, 5, 20, 8) = ${r1}\ngetMax(1, 2, 3) = ${r2}`;
}

// 버튼 이벤트 등록
document.getElementById('btn-task1')?.addEventListener('click', runTask1);
document.getElementById('btn-task2')?.addEventListener('click', runTask2);
document.getElementById('btn-task3')?.addEventListener('click', runTask3);
