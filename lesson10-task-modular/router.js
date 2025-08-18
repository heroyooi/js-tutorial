import { state } from './state.js';
import { renderList, bindListEvents, mountListItems } from './views/list.js';
import { renderFavorites, mountFavoriteItems } from './views/favorites.js';
import { renderAbout } from './views/about.js';

export function router() {
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
      mountFavoriteItems(); // 즐겨찾기 렌더
      break;
    }
    case '#/list':
    default: {
      app.innerHTML = renderList();
      mountListItems(); // 목록 렌더
      bindListEvents(); // 입력 이벤트 바인딩
    }
  }
}

export function updateNav() {
  document.querySelectorAll('nav a').forEach((a) => {
    a.classList.toggle('active', a.getAttribute('href') === state.route);
  });
}
