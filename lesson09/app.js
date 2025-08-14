const account = {
  owner: "홍길동",
  balance: 0,
  deposit(amount) {
    this.balance += amount;
    this.showBalance();
  },
  withdraw(amount) {
    if (this.balance >= amount) {
      this.balance -= amount;
    } else {
      alert("잔액이 부족합니다.");
    }
    this.showBalance();
  },
  showBalance() {
    document.getElementById("balanceInfo").textContent =
      `${this.owner}님의 현재 잔액: ${this.balance}원`;
  }
};

document.getElementById("depositBtn").addEventListener("click", () => {
  account.deposit(1000);
});
document.getElementById("withdrawBtn").addEventListener("click", () => {
  account.withdraw(500);
});

account.showBalance();