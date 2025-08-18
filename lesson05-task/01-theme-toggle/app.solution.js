const body = document.body;
const btn = document.getElementById('toggleBtn');

function applyTheme(theme) {
  body.className = theme;
  localStorage.setItem('theme', theme);
}

btn.addEventListener('click', () => {
  const newTheme = body.className === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
});

// 페이지 로드 시 저장된 테마 적용
const saved = localStorage.getItem('theme') || 'light';
applyTheme(saved);
