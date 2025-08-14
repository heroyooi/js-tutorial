let isLoggedIn = false;

function updateStatus() {
  if (isLoggedIn) {
    document.getElementById("status").textContent = "환영합니다! 😊";
  } else {
    document.getElementById("status").textContent = "로그인이 필요합니다. 🔒";
  }
}

document.getElementById("loginBtn").addEventListener("click", () => {
  isLoggedIn = !isLoggedIn;
  updateStatus();
});

updateStatus();

