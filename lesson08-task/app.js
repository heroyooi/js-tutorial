// 1) 상품 정보 관리
let product = { name: "노트북", price: 1500000, stock: 5 };

function renderProduct() {
  document.getElementById("productInfo").textContent =
    `${product.name} / 가격: ${product.price}원 / 재고: ${product.stock}`;
}

function updateStock() {
  if (product.stock > 0) {
    product.stock--;
    renderProduct();
  } else {
    alert("재고가 없습니다.");
  }
}

document.getElementById("updateStockBtn").addEventListener("click", updateStock);
renderProduct();

// 2) 회원 검색 기능
const members = [
  { name: "홍길동", age: 30 },
  { name: "김철수", age: 25 },
  { name: "이영희", age: 28 }
];

function findMemberByName(name) {
  return members.find(member => member.name === name);
}

document.getElementById("searchBtn").addEventListener("click", () => {
  const name = document.getElementById("searchName").value.trim();
  if (!name) return;

  const found = findMemberByName(name);
  document.getElementById("searchResult").textContent =
    found ? `${found.name} (${found.age}세)` : "회원 없음";
});

// 3) 객체 병합
document.getElementById("mergeBtn").addEventListener("click", () => {
  const obj1 = { a: 1, b: 2 };
  const obj2 = { b: 3, c: 4 };
  const merged = { ...obj1, ...obj2 }; // 전개 연산자 활용
  document.getElementById("mergeResult").textContent =
    JSON.stringify(merged, null, 2);
});