// API 요청을 보낼 기본 주소를 변수로 저장합니다.
const apiUrl = "https://jsonplaceholder.typicode.com";

// 한 페이지당 보여줄 포스트 개수
const postsPerPage = 10;

// 현재 보고 있는 페이지 번호 (초기값은 1페이지)
let currentPage = 1;

// 서버에서 받아온 전체 포스트 데이터를 이 배열에 저장합니다.
let posts = [];

/**
 * 페이지네이션 버튼을 그려주는 함수
 * @param {number} totalPosts - 전체 포스트 개수
 * @param {number} postsPerPage - 한 페이지에 보여줄 포스트 개수
 * @param {number} currentPage - 현재 활성화된 페이지 번호
 */
function renderPagination(totalPosts, postsPerPage, currentPage) {
  // 전체 페이지 개수를 계산 (올림 처리)
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  // pagination을 표시할 DOM 요소 선택
  const pagination = document.getElementById("pagination");
  // 기존에 그려진 버튼들 모두 지우기
  pagination.innerHTML = "";

  // 1부터 totalPages까지 버튼을 생성
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button"); // 버튼 요소 생성
    btn.className = "btn btn-outline-primary btn-sm mx-1"; // Bootstrap 스타일 클래스
    btn.textContent = i; // 버튼에 페이지 번호 표시

    // 현재 페이지와 같은 번호면 active 클래스 추가
    if (i === currentPage) btn.classList.add("active");

    // 버튼 클릭 시 해당 페이지의 포스트만 다시 그리는 함수 호출
    btn.addEventListener("click", () => {
      displayPostsForPage(i);
    });

    // pagination 컨테이너에 버튼 추가
    pagination.appendChild(btn);
  }
}

/**
 * 특정 페이지에 해당하는 포스트만 화면에 뿌려주는 함수
 * @param {number} page - 보여주고 싶은 페이지 번호
 */
function displayPostsForPage(page) {
  // 전역 currentPage 값을 업데이트
  currentPage = page;

  // UL#post-list 요소 선택
  const postList = document.getElementById("post-list");
  // 이전에 그려진 포스트 목록 전부 지우기
  postList.innerHTML = "";

  // 배열에서 슬라이싱할 시작 인덱스와 끝 인덱스 계산
  const start = (page - 1) * postsPerPage; // 예: page=2면 start=10
  const end = start + postsPerPage; // 예: 2페이지일 때 end=20

  // posts 배열에서 start ~ end-1까지 잘라내어 화면에 뿌리기
  posts.slice(start, end).forEach((post, idx) => {
    const li = document.createElement("li");
    li.className = "list-group-item list-group-item-action";

    // 전체 순서 번호 계산 (페이지네이션 적용 시)
    const number = start + idx + 1;

    // 번호와 제목을 함께 표시
    li.innerHTML = `
    <span class="me-2">${number}.</span>
    <span>${post.title}</span>
  `;

    li.dataset.postId = post.id;
    li.addEventListener("click", () => {
      window.location.href = `detail.html?postId=${post.id}`;
    });
    postList.appendChild(li);
  });

  // 화면 아래 페이지네이션 버튼도 다시 그려줍니다.
  renderPagination(posts.length, postsPerPage, currentPage);
}

/**
 * 서버에서 전체 포스트 데이터를 처음 한 번만 가져와서
 * posts 배열에 저장하고, 1페이지를 화면에 표시해 주는 함수
 */
async function fetchAndInitPosts() {
  try {
    // API로부터 전체 포스트 목록 요청
    const response = await fetch(`${apiUrl}/posts`);
    if (!response.ok) throw new Error("Failed to fetch posts"); // 응답 코드가 200이 아니면 에러

    // JSON 형태로 변환한 뒤 posts 배열에 저장
    posts = await response.json();

    // 첫 페이지(1번 페이지)부터 화면에 표시
    displayPostsForPage(1);
  } catch (error) {
    // 에러가 발생하면 콘솔에 에러 메시지 표시
    console.error("Error:", error.message);
  }
}

// 페이지가 로드될 때 실행할 코드
window.onload = function () {
  // 만약 index.html에 <div id="pagination">가 없으면 동적으로 추가
  if (!document.getElementById("pagination")) {
    const paginationDiv = document.createElement("div");
    paginationDiv.id = "pagination";
    paginationDiv.className = "mt-4 d-flex justify-content-center";
    document.body.appendChild(paginationDiv);
  }
  // 서버에서 데이터 받아오고 화면 초기화
  fetchAndInitPosts();
};
