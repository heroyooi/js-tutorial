function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// TODO: 병렬 vs 순차 실행 시간 비교하기
