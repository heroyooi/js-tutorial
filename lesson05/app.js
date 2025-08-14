// 1) 배열 합계 구하기 (for)
const nums = [10, 20, 30, 40, 50];
let sum = 0;
for (let i = 0; i < nums.length; i++) {
  sum += nums[i];
}
console.log("배열 합계:", sum);

// 2) 짝수만 출력 (for...of)
for (const n of nums) {
  if (n % 2 !== 0) continue;
  console.log("짝수:", n);
}

// 3) 객체 속성 출력 (for...in)
const user = { name: "홍길동", age: 30, city: "서울" };
for (const key in user) {
  console.log(key, ":", user[key]);
}

// 4) while로 카운트 다운
let count = 5;
while (count > 0) {
  console.log("카운트:", count);
  count--;
}