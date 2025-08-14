function parseValue(v) {
  if (v === "null") return null;
  if (v === "undefined") return undefined;
  if (v === "true") return true;
  if (v === "false") return false;
  if (v !== "" && !isNaN(v)) return Number(v);
  return v;
}

document.getElementById("checkBtn").addEventListener("click", () => {
  const raw = document.getElementById("valueInput").value;
  const value = parseValue(raw);

  document.getElementById("orResult").textContent = `A || "기본" → ${value || "기본"}`;
  document.getElementById("nullishResult").textContent = `A ?? "기본" → ${value ?? "기본"}`;
});