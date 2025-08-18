function throttle(fn, limit) {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

window.addEventListener(
  'scroll',
  throttle(() => {
    console.log('스크롤 위치:', window.scrollY);
  }, 300)
);
