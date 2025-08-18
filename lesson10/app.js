// ---- 데이터 ----
const books = [
  { id: 1, title: 'JavaScript 완벽 가이드', category: '프론트엔드' },
  { id: 2, title: 'Node.js 교과서', category: '백엔드' },
  { id: 3, title: '모던 React', category: '프론트엔드' },
  { id: 4, title: '데이터베이스 설계', category: '백엔드' },
];

// ---- 전역 상태 ----
const state = {
  keyword: '',
  category: '전체',
  route: '#/list',
};

// ---- 유틸: 필터링 ----
function getFiltered() {
  return books.filter((b) => {
    const matchKeyword = b.title.includes(state.keyword);
    const matchCategory =
      state.category === '전체' || b.category === state.category;
    return matchKeyword && matchCategory;
  });
}

// ---- 화면 조각: 목록 전체(최초) ----
function renderList() {
  return `
          <h1>도서 목록</h1>
          <div class="toolbar">
            <input id="search" placeholder="검색..." value="${state.keyword}" />
            <select id="category">
              <option ${
                state.category === '전체' ? 'selected' : ''
              }>전체</option>
              <option ${
                state.category === '프론트엔드' ? 'selected' : ''
              }>프론트엔드</option>
              <option ${
                state.category === '백엔드' ? 'selected' : ''
              }>백엔드</option>
            </select>
          </div>
          <ul id="book-list"></ul>
        `;
}

// ---- 화면 조각: 소개 ----
function renderAbout() {
  return `
          <h1>소개</h1>
          <p>이 앱은 <b>순수 JavaScript</b>만으로 만든 미니 SPA입니다.</p>
          <p>검색, 필터, 상태관리, 해시 라우팅을 포함하고 있습니다.</p>
        `;
}

// ---- 부분 갱신: 리스트만 채우기 ----
function renderListOnly() {
  const ul = document.querySelector('#book-list');
  if (!ul) return;
  ul.innerHTML = getFiltered()
    .map((b) => `<li>${b.title} <small>(${b.category})</small></li>`)
    .join('');
}

// ---- 라우터 ----
function router() {
  const app = document.getElementById('app');
  const route = location.hash || '#/list';
  state.route = route;

  switch (route) {
    case '#/about':
      app.innerHTML = renderAbout();
      break;
    case '#/list':
    default:
      app.innerHTML = renderList(); // 최초 1회 전체 렌더
      bindListEvents(); // 이벤트 바인딩
      renderListOnly(); // 리스트만 채우기
  }
  updateNav();
}

// ---- 네비 활성화 ----
function updateNav() {
  document.querySelectorAll('nav a').forEach((a) => {
    a.classList.toggle('active', a.getAttribute('href') === state.route);
  });
}

// ---- 이벤트 바인딩 (IME 안전 처리 + 부분 갱신) ----
function bindListEvents() {
  const search = document.getElementById('search');
  const select = document.getElementById('category');

  let isComposing = false;

  // IME 조합 시작/끝
  search.addEventListener('compositionstart', () => {
    isComposing = true;
  });
  search.addEventListener('compositionend', (e) => {
    isComposing = false;
    state.keyword = e.target.value;
    renderListOnly(); // 조합 종료 시 한 번 갱신
  });

  // 일반 입력: 조합 중엔 무시 (blur 방지)
  search.addEventListener('input', (e) => {
    if (e.isComposing || isComposing) return;
    state.keyword = e.target.value;
    renderListOnly();
  });

  // 카테고리 변경
  select.addEventListener('change', (e) => {
    state.category = e.target.value;
    renderListOnly();
  });
}

// ---- 시작 ----
window.addEventListener('hashchange', router);
window.addEventListener('load', router);
