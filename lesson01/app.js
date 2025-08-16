console.log(a); // undefined
var a = 1;

try {
  console.log(b); // ReferenceError
} catch (e) {
  console.log("b는 TDZ에 있음:", e.message);
}
let b = 2;

foo(); // 실행됨
function foo() {
  console.log("함수 호이스팅 OK");
}