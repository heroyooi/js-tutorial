const form = document.getElementById('postForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const body = document.getElementById('body').value.trim();

  if (!title || !body) return alert('제목과 본문을 입력하세요.');

  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body, userId: 1 }),
    });
    const data = await res.json();
    console.log('응답 데이터:', data);
    alert('게시글 생성 완료! 콘솔 확인하세요.');
  } catch (err) {
    console.error('에러 발생:', err);
  }
});
