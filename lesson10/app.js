// ========== 1) 이벤트 위임 – Todo 토글 ==========
(function setupTodoDelegation() {
  const $todos = document.getElementById('todos');

  // 컨테이너 하나에만 리스너 등록
  $todos.addEventListener('change', (e) => {
    if (!e.target.matches('.done')) return; // 관심 없는 이벤트 무시
    const li = e.target.closest('li');
    li.classList.toggle('completed', e.target.checked);
  });

  // 동적 항목 추가 (테스트)
  setTimeout(() => {
    const li = document.createElement('li');
    li.innerHTML = '<label><input type="checkbox" class="done"> 코딩 연습</label>';
    $todos.appendChild(li);
  }, 800);
})();

// ========== 2) 폼 AJAX 제출 ==========
(function setupAjaxForm() {
  const form   = document.getElementById('contact');
  const btn    = document.getElementById('submitBtn');
  const status = document.getElementById('status');

  async function sendReal(data) {
    // 데모용: 실제 API가 없으므로 httpbin으로 전송 시도
    // 필요 시 '/api/contact'로 교체하세요.
    const res = await fetch('https://httpbin.org/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }

  function sendMock(data) {
    // 네트워크 실패 시 대체용 목업
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ok: true, echo: data }), 600);
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // 기본 제출 막기
    btn.disabled = true;
    status.textContent = '전송 중…';

    const data = Object.fromEntries(new FormData(form));
    try {
      let result;
      try {
        result = await sendReal(data);
      } catch (_) {
        // 실제 전송 실패 → 목업으로 대체
        result = await sendMock(data);
      }
      console.log('서버 응답:', result);
      status.textContent = '성공적으로 전송되었습니다.';
      form.reset();
    } catch (err) {
      console.error(err);
      status.textContent = `전송 실패: ${err.message}`;
    } finally {
      btn.disabled = false;
      setTimeout(() => (status.textContent = ''), 1500);
    }
  });
})();

// ========== 3) 버블링/캡처 + 전파 차단 실험 ==========
(function setupPhases() {
  const logBox = document.getElementById('phaseLog');
  const outer  = document.getElementById('outer');
  const inner  = document.getElementById('inner');
  const btn    = document.getElementById('btn');
  const toggle = document.getElementById('stopPropagationToggle');

  const add = (msg) => {
    console.log(msg);
    logBox.textContent = (logBox.textContent + (logBox.textContent ? '\n' : '') + msg)
      .split('\n').slice(-12).join('\n'); // 최근 12줄 유지
  };

  outer.addEventListener('click', () => add('outer - bubbling'));
  outer.addEventListener('click', () => add('outer - capturing'), { capture: true });

  inner.addEventListener('click', () => add('inner - bubbling'));
  inner.addEventListener('click', () => add('inner - capturing'), { capture: true });

  btn.addEventListener('click', (e) => {
    add('btn - target');
    if (toggle.checked) {
      e.stopPropagation(); // 전파 차단
      add('→ stopPropagation() 호출됨 (여기서 전파 중단)');
    }
  });
})();

// ========== 4) 접근성 – 키보드로 활성화되는 커스텀 버튼 ==========
(function setupA11yButton() {
  const like = document.getElementById('like');

  function toggleLike() {
    const pressed = like.getAttribute('aria-pressed') === 'true';
    like.setAttribute('aria-pressed', String(!pressed));
    like.classList.toggle('on', !pressed);
  }

  like.addEventListener('click', toggleLike);
  like.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault(); // Space 기본 스크롤 방지
      toggleLike();
    }
  });
})();

// ========== 5) (선택) 성능 – 스크롤 핸들러 최적화 ==========
(function setupScrollPerf() {
  const log = document.getElementById('scrollLog');

  // 간단 throttle: 마지막 실행 후 delay 이전 호출은 무시
  function throttle(fn, delay = 100) {
    let last = 0;
    return (...args) => {
      const now = Date.now();
      if (now - last >= delay) {
        last = now;
        fn.apply(null, args);
      }
    };
  }

  function onScroll() {
    const msg = `scrollY: ${Math.round(window.scrollY)}`;
    log.textContent = `스크롤 로그:\n` + (log.textContent.split('\n').slice(1).concat(msg).slice(-10).join('\n'));
  }

  // 스크롤은 기본 동작을 막지 않음 → passive:true 권장
  window.addEventListener('scroll', throttle(onScroll, 100), { passive: true });
})();

