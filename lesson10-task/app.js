// 1) Book 생성자 함수
function Book(title, author, price) {
  this.title = title;
  this.author = author;
  this.price = price;
}

// 2) prototype에 메서드 추가
Book.prototype.getSummary = function() {
  return `${this.title} – ${this.author} – ${this.price.toLocaleString()}원`;
};

// 3) 책 목록 관리
const books = [];

document.getElementById("addBookBtn").addEventListener("click", () => {
  const title = document.getElementById("titleInput").value.trim();
  const author = document.getElementById("authorInput").value.trim();
  const price = Number(document.getElementById("priceInput").value);

  if (!title || !author || price <= 0) {
    alert("제목, 저자, 가격을 모두 올바르게 입력하세요.");
    return;
  }

  const newBook = new Book(title, author, price);
  books.push(newBook);

  renderList();
  clearInputs();
});

function renderList() {
  const list = document.getElementById("bookList");
  list.innerHTML = books.map(book => `<li>${book.getSummary()}</li>`).join("");
}

function clearInputs() {
  document.getElementById("titleInput").value = "";
  document.getElementById("authorInput").value = "";
  document.getElementById("priceInput").value = "";
}