import { router, updateNav } from './router.js';
import { loadState } from './storage.js';

// 해시 라우팅 이벤트 바인딩
window.addEventListener('hashchange', () => {
  router();
  updateNav();
});

// 초기 로드
window.addEventListener('load', () => {
  loadState(); // localStorage → state 복원
  router(); // 최초 렌더
  updateNav(); // 내비 상태 반영
});
