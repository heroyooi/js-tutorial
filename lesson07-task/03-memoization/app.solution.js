function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}

function memoize(fn) {
  const cache = new Map();
  return (arg) => {
    if (cache.has(arg)) {
      console.log('캐시 히트:', arg);
      return cache.get(arg);
    }
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
}

const fibMemo = memoize(fib);

console.time('fib(35)');
console.log(fib(35)); // 오래 걸림
console.timeEnd('fib(35)');

console.time('fibMemo(35)');
console.log(fibMemo(35)); // 캐시 활용
console.timeEnd('fibMemo(35)');
