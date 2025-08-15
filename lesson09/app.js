// 공용 유틸
const wait = (ms) => new Promise((res) => setTimeout(res, ms));

// 1) 기본 async/await – wait 후 "done"
export async function runTask1() {
  const out = document.getElementById("out-task1");
  out.textContent = "대기 중...(300ms)";
  await wait(300);
  console.log("done");
  out.textContent = "done";
}

// 2) 에러 처리 – 40% 실패 maybe()
function maybe() {
  return new Promise((resolve, reject) => {
    const ok = Math.random() >= 0.4; // 60% 성공
    setTimeout(() => {
      ok ? resolve("성공") : reject(new Error("무작위 오류"));
    }, 200);
  });
}
export async function runTask2() {
  const out = document.getElementById("out-task2");
  out.textContent = "실행 중...(200ms)";
  try {
    const msg = await maybe();
    console.log(msg);
    out.textContent = msg;
  } catch (e) {
    console.log(`실패: ${e.message}`);
    out.textContent = `실패: ${e.message}`;
  }
}

// 3) 병렬 처리 – fetchUser + fetchPosts (모킹)
const fetchUser = () =>
  new Promise((res) => setTimeout(() => res({ id: 1, name: "철수" }), 300));

const fetchPosts = () =>
  new Promise((res) =>
    setTimeout(() => res([{ id: 10, title: "첫 글" }, { id: 11, title: "둘째 글" }]), 400)
  );

export async function runTask3() {
  const out = document.getElementById("out-task3");
  out.textContent = "동시에 요청 중...(~400ms)";
  // 동시에 시작
  const pUser = fetchUser();
  const pPosts = fetchPosts();
  // 한 번에 합류
  const [user, posts] = await Promise.all([pUser, pPosts]);
  const result = { user, posts };
  console.log(result);
  out.textContent = JSON.stringify(result, null, 2);
}

// 4) 타임아웃 – withTimeout
function withTimeout(promise, ms = 800) {
  return Promise.race([
    promise,
    new Promise((_, rej) => setTimeout(() => rej(new Error("타임아웃")), ms)),
  ]);
}
export async function runTask4() {
  const out = document.getElementById("out-task4");
  out.textContent = "느린 작업 실행 중...(타임아웃 800ms)";
  // 느린 요청 흉내(1.2s)
  const slowFetch = new Promise((res) => setTimeout(() => res("OK(느림)"), 1200));
  try {
    const data = await withTimeout(slowFetch, 800);
    console.log("결과:", data);
    out.textContent = `결과: ${data}`;
  } catch (e) {
    console.error(e.message);
    out.textContent = e.message; // "타임아웃"
  }
}

// 5) 취소 가능 요청 – 버튼 토글
let controller = null;
export function initCancellableFetch() {
  const btn = document.getElementById("toggle");
  const out = document.getElementById("out-task5");

  btn.onclick = async () => {
    // 이미 진행 중이면 취소
    if (controller) {
      controller.abort();
      controller = null;
      btn.textContent = "요청 시작";
      console.log("요청 취소됨");
      out.textContent = "요청 취소됨";
      return;
    }

    // 새 요청 시작
    controller = new AbortController();
    btn.textContent = "요청 취소";
    out.textContent = "요청 시작";
    console.log("요청 시작");

    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
        signal: controller.signal,
      });
      const data = await res.json();
      console.log("응답:", data);
      out.textContent = `응답: ${JSON.stringify(data, null, 2)}`;
    } catch (e) {
      if (e.name === "AbortError") {
        console.log("AbortError 처리 완료");
        out.textContent = "AbortError 처리 완료";
      } else {
        console.error("네트워크 오류:", e.message);
        out.textContent = `네트워크 오류: ${e.message}`;
      }
    } finally {
      controller = null;
      btn.textContent = "요청 시작";
      console.log("요청 종료");
    }
  };
}

// 버튼 이벤트 연결
document.getElementById("btn-task1")?.addEventListener("click", runTask1);
document.getElementById("btn-task2")?.addEventListener("click", runTask2);
document.getElementById("btn-task3")?.addEventListener("click", runTask3);
document.getElementById("btn-task4")?.addEventListener("click", runTask4);
initCancellableFetch();