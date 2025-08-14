const name = "홍길동";
const age = 30;
const city = "서울";

const cardHTML = `
  <p>이름: ${name}</p>
  <p>나이: ${age}</p>
  <p>사는 곳: ${city}</p>
`;

document.getElementById("card").innerHTML = cardHTML;