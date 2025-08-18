// ===== 0) 초기 데이터 =====
const books = [
  { id: 1, title: 'JavaScript 완벽 가이드', category: '프론트엔드' },
  { id: 2, title: 'Node.js 교과서', category: '백엔드' },
  { id: 3, title: '모던 React', category: '프론트엔드' },
  { id: 4, title: '데이터베이스 설계', category: '백엔드' },
];

// ===== 1) 상태 + localStorage 연동 =====
const STORAGE_KEYS = {
  keyword: 'lesson10_keyword',
  category: 'lesson10_category',
  favorites: 'lesson10_favorites',
};

const state = {
  keyword: '',
  category: '전체',
  route: '#/list',
  favorites: new Set(), // Number id Set
};

function loadState() {
  try {
    const k = localStorage.getItem(STORAGE_KEYS.keyword);
    const c = localStorage.getItem(STORAGE_KEYS.category);
    const f = localStorage.getItem(STORAGE_KEYS.favorites);

    if (typeof k === 'string') state.keyword = k;
    if (typeof c === 'string') state.category = c;
    if (typeof f === 'string') {
      const arr = JSON.parse(f);
      if (Array.isArray(arr)) state.favorites = new Set(arr);
    }
  } catch (_) {
    /* ignore */
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEYS.keyword, state.keyword);
  localStorage.setItem(STORAGE_KEYS.category, state.category);
  localStorage.setItem(
    STORAGE_KEYS.favorites,
    JSON.stringify([...state.favorites])
  );
}

// ===== 2) 유틸: 검색어 하이라이트 =====
function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function highlight(text, keyword) {
  if (!keyword) return text;
  const re = new RegExp(escapeRegExp(keyword), 'gi');
  return text.replace(re, (m) => `<mark>${m}</mark>`);
}

// ===== 3) 화면 조각 =====
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
            <option ${
              state.category === '백엔드' ? 'selected' : ''
            }>백엔드</option>
          </select>
        </div>
        <ul id="list"></ul>
      `;
}

function renderFavorites() {
  return /*html*/ `
        <h1>즐겨찾기</h1>
        <p class="empty">즐겨찾기한 항목만 표시합니다.</p>
        <ul id="favList"></ul>
      `;
}

function renderAbout() {
  return /*html*/ `
        <h1>소개</h1>
        <p>순수 JS로 만든 미니 SPA입니다.</p>
        <ul>
          <li>검색어 <code>&lt;mark&gt;</code> 강조</li>
          <li><code>#/favorites</code> 라우팅</li>
          <li>검색/카테고리/즐겨찾기 상태 localStorage 저장</li>
        </ul>
      `;
}

// ===== 4) 필터 + 부분 렌더 함수 =====
function filterBooks(keyword = state.keyword, category = state.category) {
  const kw = keyword.trim().toLowerCase();
  return books.filter((b) => {
    const matchKeyword = kw ? b.title.toLowerCase().includes(kw) : true;
    const matchCategory = category === '전체' || b.category === category;
    return matchKeyword && matchCategory;
  });
}

function mountListItems(container, items) {
  if (!items.length) {
    container.innerHTML = `<li class="empty">조건에 맞는 결과가 없습니다.</li>`;
    return;
  }
  container.innerHTML = items
    .map((b) => {
      const isFav = state.favorites.has(b.id);
      const title = highlight(b.title, state.keyword);
      return /*html*/ `
          <li>
            <span>${title} <small class="cat">(${b.category})</small></span>
            <button class="fav ${isFav ? 'is-active' : ''}" data-id="${b.id}">
              ${isFav ? '⭐ 즐겨찾기됨' : '☆ 즐겨찾기'}
            </button>
          </li>
        `;
    })
    .join('');

  // 즐겨찾기 토글 (부분 갱신만)
  container.querySelectorAll('button.fav').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);
      if (state.favorites.has(id)) state.favorites.delete(id);
      else state.favorites.add(id);
      saveState();

      // 현재 라우트에 맞춰 해당 영역만 갱신
      if (state.route === '#/list') {
        renderListOnly();
      } else if (state.route === '#/favorites') {
        renderFavoritesOnly();
      }
    });
  });
}

function renderListOnly() {
  const $ul = document.getElementById('list');
  if (!$ul) return;
  mountListItems($ul, filterBooks());
}

function renderFavoritesOnly() {
  const $ul = document.getElementById('favList');
  if (!$ul) return;
  const favItems = books.filter((b) => state.favorites.has(b.id));
  // 즐겨찾기 화면에도 필터를 적용하려면 아래 한 줄로 치환:
  // const favItems = filterBooks().filter((b) => state.favorites.has(b.id));
  mountListItems($ul, favItems);
}

// ===== 5) 목록 화면 입력 이벤트 (IME 안전) =====
function bindListEvents() {
  const $search = document.getElementById('search');
  const $category = document.getElementById('category');

  let isComposing = false;

  $search.addEventListener('compositionstart', () => {
    isComposing = true;
  });
  $search.addEventListener('compositionend', (e) => {
    isComposing = false;
    state.keyword = e.target.value;
    saveState();
    renderListOnly(); // 조합 종료 시 한 번만 갱신
  });

  $search.addEventListener('input', (e) => {
    if (e.isComposing || isComposing) return; // IME 조합 중엔 무시
    state.keyword = e.target.value;
    saveState();
    renderListOnly(); // 부분 갱신 (router() 금지)
  });

  $category.addEventListener('change', (e) => {
    state.category = e.target.value;
    saveState();
    renderListOnly(); // 부분 갱신 (router() 금지)
  });
}

// ===== 6) 라우터 =====
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
    case '#/about': {
      app.innerHTML = renderAbout();
      break;
    }
    case '#/favorites': {
      app.innerHTML = renderFavorites();
      renderFavoritesOnly();
      break;
    }
    case '#/list':
    default: {
      app.innerHTML = renderList(); // 최초 1회 전체 렌더
      bindListEvents(); // 이벤트 바인딩
      renderListOnly(); // 리스트만 채우기
    }
  }
  updateNav();
}

// ===== 7) 초기 로드 =====
window.addEventListener('hashchange', router);
window.addEventListener('load', () => {
  loadState();
  router();
});
