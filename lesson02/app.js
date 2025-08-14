/* =========================================
 * JS 2회차 과제 풀이 – Console에서 확인하세요
 * ========================================= */

// [STEP 1] 사용자 정보 변수 선언
console.log("[STEP 1] 사용자 정보 변수 선언");
const nameKorean = "홍길동";   // 바뀔 일이 없다고 가정 → const
let age = 29;                  // 변화 가능성 있음 → let
const email = "hong@example.com";

console.log("이름:", nameKorean);
console.log("나이:", age);
console.log("이메일:", email);

// 나이 업데이트(예: 생일 지남)
age = age + 1;
console.log("업데이트된 나이:", age);
console.log("----------------------------------");

// [STEP 2] 프로필 객체 생성 & 속성 변경
console.log("[STEP 2] 프로필 객체 생성 & 속성 변경");
const profile = {
  name: nameKorean,
  age,           // 위의 age 변수 사용
  email,
  tags: ["beginner", "javascript"],
};

console.log("초기 profile:", profile);

// const 객체라도 '참조'만 고정. 내부 속성은 변경 가능
profile.age = profile.age + 1;
profile.tags.push("fe-school");
profile.nickname = "길동"; // 새 속성 추가

console.log("수정 후 profile:", profile);
console.log("----------------------------------");

// [STEP 3] typeof로 타입 점검
console.log("[STEP 3] typeof 테스트");
console.log("typeof 42 =", typeof 42);                 // number
console.log('typeof "42" =', typeof "42");            // string
console.log("typeof true =", typeof true);            // boolean
console.log("typeof undefined =", typeof undefined);  // undefined
console.log("typeof null =", typeof null);            // object ← 역사적 버그
console.log("typeof {} =", typeof {});                // object
console.log("typeof [] =", typeof []);                // object
console.log("typeof function(){} =", typeof function(){}); // function
console.log("----------------------------------");

// [BONUS 1] 원시 vs 참조 – 값 복사 vs 참조 공유
console.log("[BONUS 1] 원시 vs 참조");

// 원시(Primitive): 값 복사
let a = 10;
let b = a;
b = 20;
console.log("원시 타입 값 복사 → a:", a, "b:", b); // a=10, b=20

// 참조(Reference): 주소 공유
const obj1 = { value: 10 };
const obj2 = obj1;     // 같은 객체를 가리킴
obj2.value = 99;
console.log("참조 타입 공유 → obj1.value:", obj1.value, "obj2.value:", obj2.value); // 둘 다 99
console.log("----------------------------------");

// [BONUS 2] 명시적/암시적 타입 변환
console.log("[BONUS 2] 타입 변환");

// 명시적(의도적으로 변환)
console.log("Number('123') =", Number("123"));  // 123
console.log("String(123) =", String(123));      // "123"
console.log("Boolean(1) =", Boolean(1));        // true
console.log("Boolean(0) =", Boolean(0));        // false

// 암시적(연산 중 자동 변환)
console.log("'5' + 1 =", "5" + 1);  // "51" (문자열 이어붙이기)
console.log("'5' - 1 =", "5" - 1);  // 4 (수학 연산 위해 숫자로 변환)
console.log("true + 1 =", true + 1); // 2 (true → 1)
console.log("false + 1 =", false + 1); // 1 (false → 0)
console.log("----------------------------------");

// [EXTRA] 안정적인 비교 팁
console.log("[EXTRA] 비교 팁");
console.log("0 == false :", 0 == false);   // true (암시 변환)
console.log("0 === false:", 0 === false);  // false (타입까지 비교)
console.log("'42' == 42 :", "42" == 42);   // true
console.log("'42' === 42:", "42" === 42);  // false
console.log("권장: 항상 === 사용해 타입까지 동일한지 비교하기");