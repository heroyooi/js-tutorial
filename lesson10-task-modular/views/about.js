export function renderAbout() {
  return /*html*/ `
    <h1>소개</h1>
    <p>이 앱은 <b>순수 JavaScript</b>만으로 만든 미니 SPA입니다.</p>
    <ul>
      <li>검색어 <code>&lt;mark&gt;</code> 강조</li>
      <li><code>#/favorites</code> 라우팅</li>
      <li>검색/카테고리/즐겨찾기 상태 localStorage 저장</li>
      <li>ES Modules 기반 파일 분리</li>
    </ul>
  `;
}
