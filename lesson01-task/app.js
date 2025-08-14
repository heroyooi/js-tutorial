// app.js
const name = "홍길동";
const age = 28;
const job = "프론트엔드 개발자";
const city = "서울";

const profileHTML = `
  <div class="card">
    <h2>${name}</h2>
    <p>나이: ${age}세</p>
    <p>직업: ${job}</p>
    <p>사는 곳: ${city}</p>
  </div>
`;

document.getElementById("profile").innerHTML = profileHTML;