let shoppingList = [];

function renderList() {
  const listEl = document.getElementById("shoppingList");
  listEl.innerHTML = "";
  shoppingList.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${item}`;
    listEl.appendChild(li);
  });
}

document.getElementById("addBtn").addEventListener("click", () => {
  const input = document.getElementById("itemInput");
  const value = input.value.trim();

  if (value === "") return;

  shoppingList.push(value);
  input.value = "";
  renderList();
});