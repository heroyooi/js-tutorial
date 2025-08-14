let members = [];

function renderMembers() {
  const listEl = document.getElementById("memberList");
  listEl.innerHTML = "";
  members.forEach((member, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${member.name} (${member.age}세)`;
    listEl.appendChild(li);
  });
}

document.getElementById("addBtn").addEventListener("click", () => {
  const name = document.getElementById("nameInput").value.trim();
  const age = parseInt(document.getElementById("ageInput").value.trim(), 10);

  if (name === "" || isNaN(age)) return;

  const newMember = { name, age };
  members.push(newMember);
  renderMembers();
});