// TODO 0) 초기 데이터
const books = [
  { id: 1, title: 'JavaScript 완벽 가이드', category: '프론트엔드' },
  { id: 2, title: 'Node.js 교과서', category: '백엔드' },
  { id: 3, title: '모던 React', category: '프론트엔드' },
  { id: 4, title: '데이터베이스 설계', category: '백엔드' },
];

// TODO 1) 상태: keyword, category, route, favorites(Set)
//  - keyword, category, favorites는 localStorage에서 불러오기/저장하기

const STORAGE_KEYS = {
  keyword: 'lesson10_keyword',
  category: 'lesson10_category',
  favorites: 'lesson10_favorites',
};

// TODO: 상태 복원 함수 (loadState) / 저장 함수 (saveState)
const state = {
  keyword: '',
  category: '전체',
  route: '#/list',
  favorites: new Set(), // id Set
};

// TODO 2) 유틸: 하이라이트(검색어 강조) 함수
//  - 검색어가 비어있으면 원문 반환
//  - 정규식 특수문자 이스케이프 필요

function highlight(text, keyword) {
  return text;
}

// TODO 3) 렌더 함수: 목록 / 즐겨찾기 / 소개
function renderList() {
  return /*html*/ `
    <h1>도서 목록</h1>
    <div class="controls">
      <input id="search" placeholder="검색..." value="${state.keyword}" />
      <select id="category">
        <option ${state.category === '전체' ? 'selected' : ''}>전체</option>
        <option ${
          state.category === '프론트엔드' ? 'selected' : ''
        }>프론트엔드</option>
        <option ${state.category === '백엔드' ? 'selected' : ''}>백엔드</option>
      </select>
    </div>
    <ul id="list"></ul>
  `;
}

function renderFavorites() {
  return /*html*/ `
    <h1>즐겨찾기</h1>
    <p class="empty">즐겨찾기한 항목을 모아봅니다.</p>
    <ul id="favList"></ul>
  `;
}

function renderAbout() {
  return /*html*/ `
    <h1>소개</h1>
    <p>이 앱은 순수 JS로 만든 미니 SPA입니다.</p>
    <ul>
      <li>검색어 <code>mark</code> 강조</li>
      <li><code>#/favorites</code> 라우트</li>
      <li>localStorage 상태 저장</li>
    </ul>
  `;
}

// TODO 4) 실제 아이템 목록 그리기 + 즐겨찾기 토글 버튼 바인딩
function mountListItems(container, items) {
  // items를 기반으로 <li> ... </li> 생성, highlight 적용
  // 버튼 클릭 시 favorites 토글 & 저장 & 재렌더
}

// TODO 5) 이벤트 바인딩 (검색/카테고리 변경 시 상태 변경 + 저장 + 재렌더)
function bindListEvents() {
  // #search, #category 이벤트 처리
}

// TODO 6) 라우터
function updateNav() {
  document.querySelectorAll('nav a').forEach((a) => {
    a.classList.toggle('active', a.getAttribute('href') === state.route);
  });
}

function router() {
  const app = document.getElementById('app');
  const route = location.hash || '#/list';
  state.route = route;

  switch (route) {
    case '#/about':
      app.innerHTML = renderAbout();
      break;
    case '#/favorites':
      app.innerHTML = renderFavorites();
      // TODO: 즐겨찾기 아이템 렌더
      break;
    case '#/list':
    default:
      app.innerHTML = renderList();
    // TODO: 목록 아이템 렌더 + 이벤트 바인딩
  }
  updateNav();
}

// TODO 7) 초기 로드
window.addEventListener('hashchange', router);
window.addEventListener('load', () => {
  // TODO: loadState(); router();
});
