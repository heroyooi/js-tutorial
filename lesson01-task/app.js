// 1) 지역 변수 vs 전역 변수 테스트
let globalVar = "🌏 전역 변수";

document.getElementById("scopeBtn").addEventListener("click", () => {
  let localVar = "📍 지역 변수";

  console.log("=== 전역/지역 변수 테스트 ===");
  console.log("전역 변수:", globalVar); // 접근 가능
  console.log("지역 변수:", localVar); // 접근 가능
});

console.log("=== 함수 밖에서 접근 시 ===");
console.log("전역 변수:", globalVar); // 가능
try {
  console.log("지역 변수:", localVar); // ❌ 에러
} catch (e) {
  console.error("지역 변수는 함수 밖에서 접근 불가:", e.message);
}

// 2) var, let, const 블록 스코프 차이
document.getElementById("blockScopeBtn").addEventListener("click", () => {
  console.log("=== 블록 스코프 테스트 ===");

  if (true) {
    var varVariable = "var 변수";
    let letVariable = "let 변수";
    const constVariable = "const 변수";

    console.log("블록 내부:", varVariable, letVariable, constVariable);
  }

  console.log("블록 외부 var:", varVariable); // 가능
  try {
    console.log("블록 외부 let:", letVariable); // ❌ 에러
  } catch (e) {
    console.error("let 변수 접근 불가:", e.message);
  }
  try {
    console.log("블록 외부 const:", constVariable); // ❌ 에러
  } catch (e) {
    console.error("const 변수 접근 불가:", e.message);
  }
});