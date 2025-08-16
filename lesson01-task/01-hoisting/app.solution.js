/**
 * [정답/해설]
 * var a → 선언은 호이스팅, 초기값 undefined
 * let b → TDZ에 있어서 선언 전 접근 시 ReferenceError
 */
function test() {
  try {
    console.log(a); // undefined
  } catch (e) {
    console.log("a 접근 에러:", e.message);
  }

  try {
    console.log(b); // ReferenceError
  } catch (e) {
    console.log("b는 TDZ에 있음:", e.message);
  }

  var a = 1;
  let b = 2;

  console.log("초기화 후 a:", a); // 1
  console.log("초기화 후 b:", b); // 2
}

test();