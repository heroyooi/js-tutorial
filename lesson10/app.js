function Product(name, price) {
  this.name = name;
  this.price = price;
}

Product.prototype.getInfo = function() {
  return `${this.name} - ${this.price.toLocaleString()}원`;
};

const products = [];

document.getElementById("addBtn").addEventListener("click", () => {
  const name = document.getElementById("nameInput").value;
  const price = Number(document.getElementById("priceInput").value);

  if (!name || price <= 0) {
    alert("상품명과 가격을 올바르게 입력하세요.");
    return;
  }

  const newProduct = new Product(name, price);
  products.push(newProduct);

  renderList();
});

function renderList() {
  const list = document.getElementById("productList");
  list.innerHTML = products.map(p => `<li>${p.getInfo()}</li>`).join("");
}