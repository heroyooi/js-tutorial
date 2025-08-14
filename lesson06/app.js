function calculateTax(price, taxRate = 0.1) {
  return price + (price * taxRate);
}

document.getElementById("calcBtn").addEventListener("click", () => {
  const price = Number(document.getElementById("price").value);
  if (Number.isNaN(price) || price <= 0) {
    document.getElementById("result").textContent = "유효한 금액을 입력하세요.";
    return;
  }
  const total = calculateTax(price);
  document.getElementById("result").textContent = `세금 포함 가격: ${total.toLocaleString()}원`;
});