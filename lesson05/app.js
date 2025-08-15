// 1) Symbol
export function runTask1() {
  const userId = Symbol("userId");
  const user = { name: "홍길동", [userId]: 101 };

  console.clear();
  console.log(user[userId]); // 101
  console.log(Object.keys(user)); // ["name"]

  document.getElementById('out-task1').textContent =
    `user[userId]: ${user[userId]}\nObject.keys(user): ${JSON.stringify(Object.keys(user))}`;
}

// 2) Object.keys
export function runTask2() {
  const obj1 = { a: 1, b: 2, c: 3 };
  const keys = Object.keys(obj1);

  console.clear();
  console.log(keys); // ["a", "b", "c"]

  document.getElementById('out-task2').textContent =
    `Object.keys(obj1): ${JSON.stringify(keys)}`;
}

// 3) Object.values
export function runTask3() {
  const obj2 = { name: "Tom", age: 25 };
  const values = Object.values(obj2);

  console.clear();
  console.log(values); // ["Tom", 25]

  document.getElementById('out-task3').textContent =
    `Object.values(obj2): ${JSON.stringify(values)}`;
}

// 4) Object.entries & Object.fromEntries
export function runTask4() {
  const point = { x: 10, y: 20 };
  const entries = Object.entries(point);
  const restored = Object.fromEntries(entries);

  console.clear();
  console.log(entries);  // [["x", 10], ["y", 20]]
  console.log(restored); // { x: 10, y: 20 }

  document.getElementById('out-task4').textContent =
    `Object.entries(point): ${JSON.stringify(entries)}\n` +
    `Object.fromEntries(entries): ${JSON.stringify(restored)}`;
}

// 버튼 이벤트 등록
document.getElementById('btn-task1')?.addEventListener('click', runTask1);
document.getElementById('btn-task2')?.addEventListener('click', runTask2);
document.getElementById('btn-task3')?.addEventListener('click', runTask3);
document.getElementById('btn-task4')?.addEventListener('click', runTask4);
