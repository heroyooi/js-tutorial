document.getElementById("runBtn").addEventListener("click", () => {
  var a = 1;
  let b = 2;

  if (true) {
    var a = 10; // 같은 함수 안에서 공유됨
    let b = 20; // 블록 안에서만 유효
    console.log("if 내부:", a, b); // 10, 20
  }

  console.log("if 외부:", a, b); // 10, 2
});

