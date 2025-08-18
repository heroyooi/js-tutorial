function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function parallel() {
  console.time('parallel');
  await Promise.all([wait(1000), wait(2000)]);
  console.timeEnd('parallel'); // 약 2초
}

async function sequential() {
  console.time('sequential');
  await wait(1000);
  await wait(2000);
  console.timeEnd('sequential'); // 약 3초
}

parallel();
sequential();
