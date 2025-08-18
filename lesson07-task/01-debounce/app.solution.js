function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const input = document.getElementById('search');
input.addEventListener(
  'input',
  debounce((e) => {
    console.log('검색어:', e.target.value);
  }, 500)
);
