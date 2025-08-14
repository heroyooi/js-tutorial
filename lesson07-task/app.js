// 1) 할 일 목록
let todos = [];

function renderTodos() {
  const listEl = document.getElementById("todoList");
  listEl.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${todo}`;
    li.addEventListener("click", () => {
      todos.splice(index, 1); // 클릭 시 삭제
      renderTodos();
    });
    listEl.appendChild(li);
  });
}

document.getElementById("addTodoBtn").addEventListener("click", () => {
  const input = document.getElementById("todoInput");
  const value = input.value.trim();
  if (value === "") return;
  todos.push(value);
  input.value = "";
  renderTodos();
});

// 2) 숫자 통계 – 짝수 평균
function calcEvenAverage(arr) {
  const evens = arr.filter(num => num % 2 === 0);
  const sum = evens.reduce((acc, cur) => acc + cur, 0);
  return evens.length > 0 ? (sum / evens.length) : 0;
}

document.getElementById("calcBtn").addEventListener("click", () => {
  const numbers = [10, 15, 20, 25, 30];
  const avg = calcEvenAverage(numbers);
  document.getElementById("avgResult").textContent = `짝수 평균: ${avg}`;
});

// 3) 검색 기능
const fruits = ["사과", "바나나", "딸기", "포도", "수박", "복숭아"];

function searchItems(arr, keyword) {
  return arr.filter(item => item.includes(keyword));
}

document.getElementById("searchBtn").addEventListener("click", () => {
  const keyword = document.getElementById("searchKeyword").value.trim();
  if (keyword === "") {
    document.getElementById("searchResult").textContent = "검색어를 입력하세요.";
    return;
  }
  const result = searchItems(fruits, keyword);
  document.getElementById("searchResult").textContent =
    result.length > 0 ? result.join(", ") : "검색 결과 없음";
});