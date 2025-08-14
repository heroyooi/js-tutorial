function createCounter() {
  let count = 0;

  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();

document.getElementById("counterBtn").addEventListener("click", function() {
  const newCount = counter();
  this.textContent = newCount;
});