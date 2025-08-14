/***********************
 * ① 로그인 횟수 기록기
 ***********************/
function createLoginTracker() {
  let total = 0;
  let success = 0;
  let fail = 0;

  // 내부 상태는 외부에서 직접 접근 불가(은닉)
  function attempt(ok) {
    total++;
    if (ok) success++; else fail++;
    return { total, success, fail };
  }
  function stats() {
    return { total, success, fail };
  }
  function reset() {
    total = success = fail = 0;
  }
  return { attempt, stats, reset };
}

// 데모용 인증 함수(실무에선 서버 검증)
function mockAuth(email, pw) {
  // 간단 규칙: 이메일에 @ 있고, 비번이 "1234"면 성공
  const ok = !!email && email.includes("@") && pw === "1234";
  return ok;
}

const tracker = createLoginTracker();
const $ = (id) => document.getElementById(id);

function renderLoginStats(s) {
  $("statTotal").textContent = `총 시도: ${s.total}`;
  $("statSuccess").textContent = `성공: ${s.success}`;
  $("statFail").textContent = `실패: ${s.fail}`;
}

$("loginBtn").addEventListener("click", () => {
  const email = $("email").value.trim();
  const pw = $("pw").value;
  const ok = mockAuth(email, pw);
  const s = tracker.attempt(ok);

  $("loginOut").textContent = ok
    ? `✅ 로그인 성공: ${email}`
    : `❌ 로그인 실패: 자격 증명을 확인하세요. (데모 비번: 1234)`;

  renderLoginStats(s);
});

$("resetLogin").addEventListener("click", () => {
  tracker.reset();
  renderLoginStats(tracker.stats());
  $("loginOut").textContent = "🔄 로그인 카운터가 초기화되었습니다.";
});

// 초기 렌더
renderLoginStats(tracker.stats());

/****************************
 * ② 랜덤 숫자 생성기 (클로저)
 ****************************/

// (A) 중복 허용 생성기: 상태는 seed 카운트 정도만(선택)
function createRandomGenerator(min, max) {
  // min/max를 기억(클로저)하고, 호출 때마다 새 숫자를 반환
  return function next() {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
}

// (B) 중복 비허용 생성기: 남은 수 풀(pool)을 닫힌 상태로 보관
function createUniqueRandomGenerator(min, max) {
  let pool = [];
  function refill() {
    pool = [];
    for (let n = min; n <= max; n++) pool.push(n);
  }
  refill();

  return {
    next() {
      if (pool.length === 0) return { done: true, value: null };
      const i = Math.floor(Math.random() * pool.length);
      const value = pool[i];
      // 한 번 나온 값은 제거
      pool.splice(i, 1);
      return { done: pool.length === 0, value };
    },
    reset() { refill(); }
  };
}

let nextNumber = null;          // 중복 허용 모드에서의 함수
let uniqueGen = null;           // 중복 비허용 모드에서의 객체
let currentMode = "any";

function initGenerator() {
  const min = Number($("min").value);
  const max = Number($("max").value);
  const mode = $("mode").value;

  if (Number.isNaN(min) || Number.isNaN(max) || min > max) {
    $("randOut").textContent = "범위를 올바르게 입력하세요. (예: 1 ~ 10)";
    return;
  }

  currentMode = mode;
  if (mode === "any") {
    nextNumber = createRandomGenerator(min, max); // 함수 반환
    uniqueGen = null;
    $("randOut").textContent = `🎯 중복 허용 생성기 준비: [${min} ~ ${max}]`;
  } else {
    uniqueGen = createUniqueRandomGenerator(min, max); // 객체 반환
    nextNumber = null;
    $("randOut").textContent = `✅ 중복 없는 생성기 준비: [${min} ~ ${max}] (모두 소진되면 done)`;
  }
}

$("createGen").addEventListener("click", initGenerator);

$("nextNum").addEventListener("click", () => {
  if (currentMode === "any") {
    if (!nextNumber) {
      $("randOut").textContent = "먼저 생성기를 만들세요.";
      return;
    }
    const v = nextNumber();
    $("randOut").textContent = `🎲 결과: ${v}`;
  } else {
    if (!uniqueGen) {
      $("randOut").textContent = "먼저 생성기를 만들세요.";
      return;
    }
    const { done, value } = uniqueGen.next();
    if (value === null && done) {
      $("randOut").textContent = "⚠️ 모두 소진되었습니다. ‘생성기 만들기/초기화’를 눌러 재시작하세요.";
    } else {
      $("randOut").textContent = done
        ? `🎲 결과: ${value}  (마지막 값, 이제 소진됨)`
        : `🎲 결과: ${value}`;
    }
  }
});

// 첫 화면 안내
$("randOut").textContent = "범위와 모드를 설정한 뒤 ‘생성기 만들기/초기화’를 누르세요.";