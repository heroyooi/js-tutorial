// 예상 출력 순서: A → D → C → B
console.log('A');

setTimeout(() => console.log('B'), 0); // 매크로태스크

Promise.resolve().then(() => console.log('C')); // 마이크로태스크

console.log('D');
