// 앱 전역 상태와 고정 데이터
export const books = [
  { id: 1, title: 'JavaScript 완벽 가이드', category: '프론트엔드' },
  { id: 2, title: 'Node.js 교과서', category: '백엔드' },
  { id: 3, title: '모던 React', category: '프론트엔드' },
  { id: 4, title: '데이터베이스 설계', category: '백엔드' },
];

export const state = {
  keyword: '',
  category: '전체',
  route: '#/list',
  favorites: new Set(), // number id Set
};

// 선택 유틸
export function isFavorite(id) {
  return state.favorites.has(id);
}

export function toggleFavorite(id) {
  if (state.favorites.has(id)) state.favorites.delete(id);
  else state.favorites.add(id);
}
