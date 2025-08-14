/**************
 * 공통 유틸
 **************/
const $ = (id) => document.getElementById(id);
function log(el, ...args) {
  console.log(...args);
  el.textContent += args.map(a => (typeof a === 'string' ? a : JSON.stringify(a))).join(' ') + '\n';
}

/************************************
 * 가짜 API: 성공/실패/지연 시뮬레이션
 ************************************/
function fakeApi(name, { delay = 500, ok = true, payload = {} } = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (ok) resolve({ name, ok: true, data: { ...payload, ts: Date.now() } });
      else reject(new Error(`${name} 실패`));
    }, delay);
  });
}

/********************************
 * ① 제한 병렬 처리기 (정답 예시)
 ********************************/
/**
 * tasks: Promise 반환 함수들의 배열 () => Promise<any>
 * limit: 동시에 실행할 최대 개수
 * 반환: 각 task의 결과/에러를 순서에 맞춘 배열로 resolve
 */
async function runWithConcurrency(tasks, limit = 2, onProgress) {
  const results = new Array(tasks.length);
  let inFlight = 0;
  let nextIndex = 0;

  return new Promise((resolve) => {
    function launch() {
      while (inFlight < limit && nextIndex < tasks.length) {
        const current = nextIndex++;
        inFlight++;

        tasks[current]().then(
          (value) => { results[current] = { status: 'fulfilled', value }; },
          (reason) => { results[current] = { status: 'rejected', reason: reason instanceof Error ? reason.message : reason }; }
        ).finally(() => {
          inFlight--;
          onProgress?.(current, results[current]);
          if (nextIndex === tasks.length && inFlight === 0) {
            resolve(results);
          } else {
            launch();
          }
        });
      }
    }
    launch();
  });
}

// 버튼 동작: 서로 다른 지연/성공여부의 6개 작업을 동시성 제한으로 실행
$('runLimited').addEventListener('click', async () => {
  const out = $('limitedLog'); out.textContent = '';
  const limit = Math.max(1, Number($('concurrency').value) || 2);

  // 작업 6개 정의(함수 배열)
  const tasks = [
    () => fakeApi('A', { delay: 900, ok: true,  payload: { i: 1 } }),
    () => fakeApi('B', { delay: 600, ok: false, payload: { i: 2 } }),
    () => fakeApi('C', { delay: 300, ok: true,  payload: { i: 3 } }),
    () => fakeApi('D', { delay: 1200, ok: true, payload: { i: 4 } }),
    () => fakeApi('E', { delay: 400, ok: false, payload: { i: 5 } }),
    () => fakeApi('F', { delay: 500, ok: true,  payload: { i: 6 } }),
  ];

  log(out, `동시성 한도 = ${limit} 로 시작`);
  const results = await runWithConcurrency(tasks, limit, (idx, res) => {
    if (res.status === 'fulfilled') log(out, `완료 #${idx}:`, res.value.name, res.value.data);
    else log(out, `실패 #${idx}:`, res.reason);
  });

  log(out, '--- 최종 결과(원래 순서) ---');
  results.forEach((r, i) => log(out, `#${i}:`, r.status === 'fulfilled' ? r.value.name : `ERR:${r.reason}`));
});

/******************************
 * ② 폴백 전략 (정답 예시)
 ******************************/
async function withFallback(primaryFn, secondaryFn) {
  try {
    return await primaryFn();
  } catch (e1) {
    return await secondaryFn(); // 2차에서 성공/실패 결과를 그대로 전파
  }
}

$('runFallback').addEventListener('click', async () => {
  const out = $('fallbackLog'); out.textContent = '';

  // 1차 API: 실패(예시), 2차 API: 성공(폴백)
  const primary = () => fakeApi('primary', { delay: 600, ok: false });
  const secondary = () => fakeApi('secondary', { delay: 400, ok: true, payload: { source: 'fallback' } });

  try {
    const res = await withFallback(primary, secondary);
    log(out, '성공 👍', res.name, res.data);
  } catch (e) {
    log(out, '모든 경로 실패 ❌', e.message);
  }
});

/***********************************************
 * ③ 지수 백오프 + 타임아웃 결합 (정답 예시)
 ***********************************************/
function withTimeout(promise, ms = 700) {
  const t = new Promise((_, reject) => setTimeout(() => reject(new Error(`Timeout ${ms}ms`)), ms));
  return Promise.race([promise, t]);
}

async function retry(fn, max = 3, base = 300) {
  let attempt = 0;
  while (true) {
    try {
      return await fn(attempt + 1);
    } catch (e) {
      if (++attempt >= max) throw e;
      const wait = base * 2 ** (attempt - 1);
      await new Promise(r => setTimeout(r, wait));
    }
  }
}

$('runResilient').addEventListener('click', async () => {
  const out = $('resilientLog'); out.textContent = '';
  const ms = Math.max(100, Number($('timeoutMs').value) || 700);
  const max = Math.max(0, Number($('maxRetry').value) || 3);

  // 실패하다가 나중에 성공할 수도, 타임아웃으로 실패할 수도 있는 API 시뮬레이션
  let calls = 0;
  function flakyCall() {
    calls += 1;
    const ok = calls >= 3; // 1~2회 실패, 3회차 성공 가정
    const variableDelay = 500 + Math.floor(Math.random() * 500); // 500~1000ms
    return fakeApi('flaky', { delay: variableDelay, ok, payload: { calls, variableDelay } });
  }

  try {
    const res = await retry(
      () => withTimeout(flakyCall(), ms),
      max,
      250 // 기본 대기 250ms (지수로 증가)
    );
    log(out, `성공 ✅ (시도 ${res.data.calls}회, 지연=${res.data.variableDelay}ms)`);
  } catch (e) {
    log(out, '실패 ❌', e.message);
  }
});