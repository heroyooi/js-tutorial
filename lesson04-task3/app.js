function weatherMessage(kind) {
  switch (kind) {
    case "sunny":  return "맑아요! 선크림 잊지 마세요. ☀️";
    case "rainy":  return "비가 와요. 우산 챙기세요. ☔";
    case "snowy":  return "눈이 와요. 미끄럼 주의! ❄️";
    case "cloudy": return "구름이 많아요. 가벼운 외투를 권장합니다. ☁️";
    case "windy":  return "바람이 강해요. 체감온도 낮을 수 있어요. 🌬️";
    default:       return "날씨 정보를 알 수 없어요.";
  }
}

document.getElementById("show").addEventListener("click", () => {
  const w = document.getElementById("weather").value;
  document.getElementById("msg").textContent = weatherMessage(w);
});