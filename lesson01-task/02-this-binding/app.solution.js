/**
 * [정답/해설]
 * - 일반 함수 단순 호출 → 전역 객체(window) 또는 undefined (strict/module)
 * - 화살표 함수 → 선언된 스코프의 this (전역 모듈이면 undefined)
 * - obj.normalFn() → obj
 * - obj.arrowFn() → 렉시컬 this (전역 this)
 * - new Person() → 새 인스턴스
 */
function normalFn() {
  console.log("일반 함수 this:", this);
}

const arrowFn = () => {
  console.log("화살표 함수 this:", this);
};

normalFn();
arrowFn();

const obj = {
  name: "FE School",
  normalFn: function () {
    console.log("obj.normalFn this:", this);
  },
  arrowFn: () => {
    console.log("obj.arrowFn this:", this);
  },
};

obj.normalFn(); // obj
obj.arrowFn();  // 전역 this

function Person(name) {
  this.name = name;
  console.log("생성자 this:", this);
}
const p = new Person("Lee");
console.log("p.name:", p.name);