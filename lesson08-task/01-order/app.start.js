// TODO: 실행 순서를 예측하고 주석으로 적어보세요.
console.log('A');

setTimeout(() => console.log('B'), 0);

Promise.resolve().then(() => console.log('C'));

console.log('D');
