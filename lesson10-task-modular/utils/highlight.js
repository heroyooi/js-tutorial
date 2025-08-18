// 검색어 하이라이트 유틸
export function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function highlight(text, keyword) {
  if (!keyword) return text;
  const re = new RegExp(escapeRegExp(keyword), 'gi');
  return text.replace(re, (m) => `<mark>${m}</mark>`);
}
