async function loadPost() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    if (!res.ok) throw new Error('요청 실패');
    const data = await res.json();
    document.getElementById('post').innerText = JSON.stringify(data, null, 2);
  } catch (err) {
    console.error('에러 발생:', err);
  }
}
loadPost();
