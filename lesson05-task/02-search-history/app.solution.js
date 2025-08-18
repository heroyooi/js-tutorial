const form = document.getElementById('searchForm');
const input = document.getElementById('keyword');
const historyList = document.getElementById('history');

function renderHistory() {
  const history = JSON.parse(sessionStorage.getItem('history') || '[]');
  historyList.innerHTML = history.map((h) => `<li>${h}</li>`).join('');
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const keyword = input.value.trim();
  if (!keyword) return;

  const history = JSON.parse(sessionStorage.getItem('history') || '[]');
  history.unshift(keyword); // 최신 검색어 맨 앞
  sessionStorage.setItem('history', JSON.stringify(history.slice(0, 5))); // 최근 5개까지만

  input.value = '';
  renderHistory();
});

renderHistory();
