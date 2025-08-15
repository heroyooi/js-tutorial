// 1) 기본 Promise
export function runTask1() {
  const out = document.getElementById("out-task1");
  out.textContent = "실행 중... (1초 뒤 결과)";
  const p1 = new Promise((resolve) => {
    setTimeout(() => resolve("완료"), 1000);
  });

  p1.then(msg => {
    console.log(msg);
    out.textContent = msg;
  });
}

// 2) 에러 처리
export function runTask2() {
  const out = document.getElementById("out-task2");
  out.textContent = "실행 중... (0.5초 뒤 결과)";

  function fiftyFifty() {
    return new Promise((resolve, reject) => {
      const ok = Math.random() < 0.5;
      setTimeout(() => (ok ? resolve("성공!") : reject(new Error("실패!"))), 500);
    });
  }

  fiftyFifty()
    .then(msg => {
      console.log(msg);
      out.textContent = msg;
    })
    .catch(err => {
      console.log(err.message);
      out.textContent = err.message;
    });
}

// 3) 체이닝
export function runTask3() {
  const out = document.getElementById("out-task3");
  out.textContent = "실행 중...";

  Promise.resolve()
    .then(() => 2)
    .then(n => n * n)
    .then(result => {
      console.log(result);
      out.textContent = `결과: ${result}`;
    });
}

// 4) finally
export function runTask4() {
  const out = document.getElementById("out-task4");
  out.textContent = "실행 중... (0.3초 뒤 결과)";

  const maybe = new Promise((resolve, reject) => {
    const ok = Math.random() > 0.3; // 70% 성공
    setTimeout(() => (ok ? resolve("OK") : reject(new Error("NG"))), 300);
  });

  maybe
    .then(v => {
      console.log("결과:", v);
      out.textContent = `결과: ${v}`;
    })
    .catch(e => {
      console.log("에러:", e.message);
      out.textContent = `에러: ${e.message}`;
    })
    .finally(() => {
      console.log("작업 끝");
      out.textContent += "\n작업 끝";
    });
}

// 버튼 이벤트 연결
document.getElementById("btn-task1")?.addEventListener("click", runTask1);
document.getElementById("btn-task2")?.addEventListener("click", runTask2);
document.getElementById("btn-task3")?.addEventListener("click", runTask3);
document.getElementById("btn-task4")?.addEventListener("click", runTask4);

