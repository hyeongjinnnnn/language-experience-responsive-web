// 네이버 검색 결과 페이지 URL
const searchURL = "http://localhost:3000/api/search";

// 네이버 검색 결과 페이지에서 테이블을 추출하고 동적으로 생성하는 함수
async function createTableFromNaver() {
  try {
    // 네이버 검색 결과 페이지에서 HTML 가져오기
    const response = await fetch(searchURL);
    const html = await response.text();

    // HTML에서 원하는 테이블 부분 추출
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const tableElement = doc.querySelector("table.inven");

    // 동적으로 생성한 테이블을 표시할 div 요소 찾기
    const resultTableContainer = document.getElementById("resultTable");

    // 동적으로 생성한 테이블을 표시
    resultTableContainer.appendChild(tableElement);
  } catch (error) {
    console.error("Error:", error);
  }
}

// 페이지 로드 시 테이블 생성 함수 호출
window.onload = createTableFromNaver;
