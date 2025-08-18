import { books, state } from '../state.js';
import { saveState } from '../storage.js';
import { highlight } from '../utils/highlight.js';

export function renderList() {
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

export function getFilteredBooks() {
  const kw = state.keyword.trim().toLowerCase();
  return books.filter((b) => {
    const matchKeyword = kw ? b.title.toLowerCase().includes(kw) : true;
    const matchCategory =
      state.category === '전체' || b.category === state.category;
    return matchKeyword && matchCategory;
  });
}

/** 리스트 영역만 부분 갱신 */
export function mountListItems() {
  const container = document.getElementById('list');
  if (!container) return;

  const items = getFilteredBooks();

  if (!items.length) {
    container.innerHTML = `<li class="empty">조건에 맞는 결과가 없습니다.</li>`;
    return;
  }

  container.innerHTML = items
    .map((b) => {
      const title = highlight(b.title, state.keyword);
      const isFav = state.favorites.has(b.id);
      return /*html*/ `
        <li>
          <span>
            ${title} <small class="cat">(${b.category})</small>
          </span>
          <button class="fav ${isFav ? 'is-active' : ''}" data-id="${b.id}">
            ${isFav ? '⭐ 즐겨찾기됨' : '☆ 즐겨찾기'}
          </button>
        </li>
      `;
    })
    .join('');

  // 즐겨찾기 토글: 전체 리렌더 금지, 현재 리스트만 갱신
  container.querySelectorAll('button.fav').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);
      if (state.favorites.has(id)) state.favorites.delete(id);
      else state.favorites.add(id);
      saveState();
      mountListItems(); // ✅ 부분 갱신만
    });
  });
}

/** 검색/카테고리 입력 이벤트 (IME 안전) */
export function bindListEvents() {
  const $search = document.getElementById('search');
  const $category = document.getElementById('category');

  if (!$search || !$category) return;

  let isComposing = false;

  // IME 조합 시작/끝
  $search.addEventListener('compositionstart', () => {
    isComposing = true;
  });
  $search.addEventListener('compositionend', (e) => {
    isComposing = false;
    state.keyword = e.target.value;
    saveState();
    mountListItems(); // ✅ 조합 종료 시 한 번만 갱신
  });

  // 일반 입력: 조합 중엔 무시 (blur 방지)
  $search.addEventListener('input', (e) => {
    if (e.isComposing || isComposing) return;
    state.keyword = e.target.value;
    saveState();
    mountListItems(); // ✅ 부분 갱신
  });

  // 카테고리 변경: 부분 갱신
  $category.addEventListener('change', (e) => {
    state.category = e.target.value;
    saveState();
    mountListItems(); // ✅ 부분 갱신
  });
}
