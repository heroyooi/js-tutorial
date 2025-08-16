// TODO: 클로저를 활용한 카운터 함수 만들기
function createCounter() {
  // 내부 count 변수를 유지해야 함
}

const counter = createCounter();
console.log(counter.getValue()); // 0
console.log(counter.increment()); // 1
console.log(counter.decrement()); // 0