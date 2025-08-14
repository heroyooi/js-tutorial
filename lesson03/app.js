// ------------------------------
// 유틸: 로그 헬퍼
// ------------------------------
const $ = (id) => document.getElementById(id);
function log(el, ...args) {
  console.log(...args);
  el.textContent += args.map(a => (typeof a === 'string' ? a : JSON.stringify(a))).join(' ') + '\n';
}

// ------------------------------
// 0) API 시뮬레이터
// ------------------------------
function fakeApi(name, { delay = 500, ok = true, payload = {} } = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (ok) resolve({ name, ok: true, data: { ...payload, ts: Date.now() } });
      else reject(new Error(`${name} 실패`));
    }, delay);
  });
}

// ------------------------------
// 1) 순차 실행 데모
// ------------------------------
$('seqBtn').addEventListener('click', async () => {
  const out = $('seqLog'); out.textContent = '';
  try {
    log(out, '시작: task1 → task2 → task3');
    const a = await fakeApi('task1', { delay: 400, payload: { step: 1 } });
    log(out, 'task1 OK', a.data);
    const b = await fakeApi('task2', { delay: 600, payload: { step: 2, prev: a.data.step } });
    log(out, 'task2 OK', b.data);
    const c = await fakeApi('task3', { delay: 500, payload: { step: 3, prev: b.data.step } });
    log(out, 'task3 OK', c.data);
    log(out, '완료 ✅');
  } catch (e) {
    log(out, '에러 ❌', e.message);
  } finally {
    log(out, 'finally: 리소스 정리/스피너 제거 등');
  }
});

// ------------------------------
// 2) 병렬 실행 데모
// ------------------------------
$('parBtn').addEventListener('click', async () => {
  const out = $('parLog'); out.textContent = '';
  try {
    log(out, '시작: user & posts & comments 병렬');
    const [user, posts, comments] = await Promise.all([
      fakeApi('user', { delay: 500, payload: { id: 7, name: 'Alice' } }),
      fakeApi('posts', { delay: 900, payload: { total: 12 } }),
      fakeApi('comments', { delay: 600, payload: { total: 48 } }),
    ]);
    log(out, 'user', user.data);
    log(out, 'posts', posts.data);
    log(out, 'comments', comments.data);
    log(out, '완료 ✅ (전체 시간 ≈ 최장 작업)');
  } catch (e) {
    log(out, '에러 ❌ (하나라도 실패하면 all이 즉시 reject)', e.message);
  }
});

// ------------------------------
// 3) 집계 비교 데모
// ------------------------------
$('aggBtn').addEventListener('click', async () => {
  const out = $('aggLog'); out.textContent = '';
  const p1 = fakeApi('A', { delay: 300, ok: true, payload: { v: 1 } });
  const p2 = fakeApi('B', { delay: 700, ok: false });
  const p3 = fakeApi('C', { delay: 500, ok: true, payload: { v: 3 } });

  try {
    await Promise.all([p1, p2, p3]);
  } catch (e) {
    log(out, 'all → 하나 실패로 즉시 실패:', e.message);
  }

  const settled = await Promise.allSettled([p1.catch(e=>e), p2.catch(e=>e), p3.catch(e=>e)]);
  log(out, 'allSettled → 모두 결과 반환:', settled.map(s => s.status).join(', '));

  try {
    const any = await Promise.any([p1, p2, p3]);
    log(out, 'any → 가장 먼저 성공:', any.name);
  } catch (e) {
    log(out, 'any → 모두 실패시 AggregateError');
  }

  try {
    const race = await Promise.race([
      fakeApi('fast-ok', { delay: 200 }),
      fakeApi('slow-fail', { delay: 800, ok: false }),
    ]);
    log(out, 'race → 가장 먼저 끝난 결과:', race.name);
  } catch (e) {
    log(out, 'race → 먼저 끝난 실패:', e.message);
  }
});

// ------------------------------
// 4) 타임아웃 & 재시도
// ------------------------------
function withTimeout(promise, ms = 800) {
  const t = new Promise((_, reject) => setTimeout(
    () => reject(new Error(`Timeout ${ms}ms`)), ms));
  return Promise.race([promise, t]);
}

async function retry(fn, max = 3, base = 300) {
  let attempt = 0;
  while (true) {
    try { return await fn(); }
    catch (e) {
      if (++attempt > max) throw e;
      const wait = base * 2 ** (attempt - 1);
      await new Promise(r => setTimeout(r, wait));
    }
  }
}

$('timeoutBtn').addEventListener('click', async () => {
  const out = $('robLog'); out.textContent = '';
  const ms = Number($('timeoutMs').value) || 800;
  try {
    const res = await withTimeout(
      fakeApi('slow-api', { delay: 1200, payload: { slow: true } }),
      ms
    );
    log(out, '응답:', res.data);
  } catch (e) {
    log(out, '타임아웃/에러:', e.message);
  }
});

$('retryBtn').addEventListener('click', async () => {
  const out = $('robLog'); out.textContent = '';
  let attempt = 0;
  function sometimesFailing() {
    attempt++;
    // 1~2회 실패 후 3회차에 성공하는 시뮬레이션
    const ok = attempt >= 3;
    return fakeApi('flaky-api', { delay: 300, ok, payload: { attempt } });
  }
  try {
    const res = await retry(() => sometimesFailing(), 3, 200);
    log(out, `성공(시도 ${res.data.attempt}) ✅`);
  } catch (e) {
    log(out, '모든 재시도 실패 ❌', e.message);
  }
});