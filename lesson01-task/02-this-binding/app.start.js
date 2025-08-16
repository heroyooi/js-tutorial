function normalFn() {
  console.log("일반 함수 this:", this);
}

const arrowFn = () => {
  console.log("화살표 함수 this:", this);
};

// TODO: 아래 호출 결과를 예측해보고 실행하세요.
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

obj.normalFn();
obj.arrowFn();

function Person(name) {
  this.name = name;
  console.log("생성자 this:", this);
}
new Person("Lee");