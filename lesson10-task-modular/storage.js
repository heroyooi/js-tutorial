import { state } from './state.js';

const STORAGE_KEYS = {
  keyword: 'lesson10_keyword',
  category: 'lesson10_category',
  favorites: 'lesson10_favorites',
};

export function loadState() {
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
    // 파싱 실패 시 무시
  }
}

export function saveState() {
  localStorage.setItem(STORAGE_KEYS.keyword, state.keyword);
  localStorage.setItem(STORAGE_KEYS.category, state.category);
  localStorage.setItem(
    STORAGE_KEYS.favorites,
    JSON.stringify([...state.favorites])
  );
}
