const output = document.getElementById("output");

function log(...args) {
  console.log(...args);
  output.textContent += args.join(" ") + "\n";
}

// 1) 1부터 100까지의 합 (for)
log("[과제 1] 1부터 100까지의 합");
let sum = 0;
for (let i = 1; i <= 100; i++) {
  sum += i;
}
log("합계:", sum);

// 2) 배열에서 홀수만 출력 (for...of)
log("\n[과제 2] 배열의 홀수만 출력");
const numbers = [3, 6, 9, 12, 15, 18, 21];
for (const num of numbers) {
  if (num % 2 === 1) {
    log(num);
  }
}

// 3) 사용자 객체의 속성과 값 출력 (for...in)
log("\n[과제 3] 사용자 객체의 속성과 값 출력");
const user = {
  name: "홍길동",
  age: 30,
  email: "hong@example.com"
};
for (const key in user) {
  log(`${key}: ${user[key]}`);
}

// 4) while문으로 10부터 1까지 역순 출력
log("\n[과제 4] 10부터 1까지 역순 출력");
let count = 10;
while (count >= 1) {
  log(count);
  count--;
}