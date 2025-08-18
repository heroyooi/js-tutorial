import { books, state } from '../state.js';
import { saveState } from '../storage.js';
import { highlight } from '../utils/highlight.js';
import { router } from '../router.js';

export function renderFavorites() {
  return /*html*/ `
    <h1>즐겨찾기</h1>
    <p class="empty">즐겨찾기한 항목만 표시합니다.</p>
    <ul id="favList"></ul>
  `;
}

export function mountFavoriteItems() {
  const container = document.getElementById('favList');
  const favItems = books.filter((b) => state.favorites.has(b.id));

  if (!favItems.length) {
    container.innerHTML = `<li class="empty">즐겨찾기한 항목이 없습니다.</li>`;
    return;
  }

  container.innerHTML = favItems
    .map((b) => {
      const title = highlight(b.title, state.keyword); // 필요 시 검색어 강조
      return /*html*/ `
        <li>
          <span>
            ${title} <small class="cat">(${b.category})</small>
          </span>
          <button class="fav is-active" data-id="${b.id}">⭐ 즐겨찾기됨</button>
        </li>
      `;
    })
    .join('');

  container.querySelectorAll('button.fav').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);
      // 즐겨찾기 해제
      if (state.favorites.has(id)) {
        state.favorites.delete(id);
        saveState();
        router();
      }
    });
  });
}
