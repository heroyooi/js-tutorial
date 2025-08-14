// 모든 질문 요소 가져오기
const questions = document.querySelectorAll(".faq-question");

questions.forEach((question) => {
  question.addEventListener("click", () => {
    // 클릭한 질문에 해당하는 답변 요소 찾기
    const answer = question.nextElementSibling;
    const isOpen = answer.classList.contains("show");

    // 모든 답변 닫기
    document.querySelectorAll(".faq-answer").forEach((ans) => {
      ans.classList.remove("show");
    });

    // 열려있지 않으면 현재 답변 열기
    if (!isOpen) {
      answer.classList.add("show");
    }

    // 버튼 기호 업데이트
    document.querySelectorAll(".faq-question span").forEach((span) => {
      span.textContent = "+";
    });
    if (!isOpen) {
      question.querySelector("span").textContent = "-";
    }
  });
});