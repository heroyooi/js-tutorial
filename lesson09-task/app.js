// 1) user 객체 – 자기소개 메서드
const user = {
  name: "홍길동",
  age: 30,
  introduce() {
    return `안녕하세요, 저는 ${this.name}, ${this.age}살입니다.`;
  }
};

document.getElementById("introBtn").addEventListener("click", () => {
  document.getElementById("introResult").textContent = user.introduce();
});

// 2) counter 객체 – 증가/감소 메서드
const counter = {
  count: 0,
  increase() {
    this.count++;
    renderCounter();
  },
  decrease() {
    this.count--;
    renderCounter();
  }
};

function renderCounter() {
  document.getElementById("counterResult").textContent = `현재 count: ${counter.count}`;
}

document.getElementById("increaseBtn").addEventListener("click", () => counter.increase());
document.getElementById("decreaseBtn").addEventListener("click", () => counter.decrease());
renderCounter();

// 3) this 동작 비교
const thisTester = {
  name: "테스터 객체",
  normalFn: function() {
    return this.name;
  },
  arrowFn: () => {
    return this.name;
  }
};

document.getElementById("normalFnBtn").addEventListener("click", () => {
  document.getElementById("thisResult").textContent = `일반 함수 this.name: ${thisTester.normalFn()}`;
});

document.getElementById("arrowFnBtn").addEventListener("click", () => {
  document.getElementById("thisResult").textContent = `화살표 함수 this.name: ${thisTester.arrowFn()}`;
});