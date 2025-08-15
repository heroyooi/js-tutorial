// 1) 타이머 취소
export function runTask1() {
  const out = document.getElementById("out-task1");

  // 5초 뒤 실행 예약
  const timeoutId = setTimeout(() => {
    console.log("보냈습니다");
    out.textContent = "보냈습니다";
  }, 5000);

  // 3초 내에 누르면 취소
  let canCancel = true;
  const cancelWindow = setTimeout(() => (canCancel = false), 3000);

  document.getElementById("cancel").onclick = () => {
    if (canCancel) {
      clearTimeout(timeoutId);
      clearTimeout(cancelWindow);
      console.log("전송 예약이 취소되었습니다 (3초 내)");
      out.textContent = "전송 예약이 취소되었습니다 (3초 내)";
    } else {
      console.log("취소 시간(3초)을 초과했습니다");
      out.textContent = "취소 시간(3초)을 초과했습니다";
    }
  };
}

// 2) 틱 다운 카운터
export function runTask2() {
  const $sec = document.getElementById("sec");
  const $start = document.getElementById("start");
  const $pause = document.getElementById("pause");
  const $resume = document.getElementById("resume");
  const $view = document.getElementById("view");

  let remain = 0;
  let id = null;

  const render = () => ($view.textContent = `${remain}s`);

  const stop = (msg) => {
    clearInterval(id);
    id = null;
    if (msg) console.log(msg);
  };

  $start.onclick = () => {
    if (id) return; // 중복 시작 방지
    remain = Math.max(1, Number($sec.value) | 0);
    render();
    id = setInterval(() => {
      remain--;
      render();
      if (remain <= 0) {
        stop("완료!");
        $view.textContent = "완료!";
      }
    }, 1000);
  };

  $pause.onclick = () => {
    if (!id) return;
    stop("일시정지");
  };

  $resume.onclick = () => {
    if (id || remain <= 0) return; // 이미 동작 중이거나 끝난 경우 무시
    id = setInterval(() => {
      remain--;
      render();
      if (remain <= 0) {
        stop("완료!");
        $view.textContent = "완료!";
      }
    }, 1000);
  };
}

// 3) 콜백 기반 비동기 유틸
export function runTask3() {
  const out = document.getElementById("out-task3");

  function loadData(cb) {
    setTimeout(() => {
      const data = Array.from({ length: 3 }, () => Math.floor(Math.random() * 10));
      cb(null, data);
    }, 400);
  }

  // 1회 호출
  loadData((err, arr) => {
    if (err) return console.error(err);
    const sum = arr.reduce((a, c) => a + c, 0);
    console.log("데이터:", arr, "합계:", sum);
    out.textContent = `데이터: ${arr} | 합계: ${sum}`;

    // 연쇄 호출 2회차
    loadData((err2, arr2) => {
      if (err2) return console.error(err2);
      const sum2 = arr2.reduce((a, c) => a + c, 0);
      console.log("데이터2:", arr2, "합계2:", sum2);
      out.textContent += `\n데이터2: ${arr2} | 합계2: ${sum2}`;
    });
  });
}

// 4) this 안전하게 다루기 – Timer 클래스
export function runTask4() {
  const out = document.getElementById("out-task4");

  class Timer {
    constructor() {
      this.tick = 0;
      this._id = null;
    }

    start() {
      if (this._id) return;
      this._id = setInterval(() => {
        this.tick++;
        console.log("tick:", this.tick);
        out.textContent = `tick: ${this.tick}`;
      }, 500);
    }

    stop() {
      clearInterval(this._id);
      this._id = null;
      console.log("정지됨");
      out.textContent += "\n정지됨";
    }
  }

  const t = new Timer();
  document.getElementById("startTimer").onclick = () => t.start();
  document.getElementById("stopTimer").onclick = () => t.stop();
}

// 이벤트 등록
runTask1();
runTask2();
document.getElementById("btn-task3")?.addEventListener("click", runTask3);
runTask4();

