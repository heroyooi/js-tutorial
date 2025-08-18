// Promise.then 버전
Promise.resolve().then(() => console.log('Promise then 실행'));

// async/await 버전
(async function () {
  console.log('async 시작');
  await null;
  console.log('async 이후 실행');
})();

console.log('동기 코드 끝');

/**
 * 예상 출력:
 * async 시작
 * 동기 코드 끝
 * Promise then 실행
 * async 이후 실행
 */
