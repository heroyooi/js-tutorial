async function fetchData() {
  try {
    const res = await fetch('https://invalid.url'); // 에러 발생
    return await res.json();
  } catch (err) {
    console.error('에러 발생:', err.message);
  } finally {
    console.log('에러 여부와 관계없이 실행됨');
  }
}

fetchData();
