const apiUrl = "https://jsonplaceholder.typicode.com"; // API 주소

async function displayPostDetail() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("postId");
    if (!postId) throw new Error("No post ID provided");

    // (1) localStorage에서 캐시 데이터 불러오기
    const cacheKey = `post_${postId}`;
    const cacheValue = localStorage.getItem(cacheKey);
    let post = null;

    if (cacheValue) {
      // 저장된 값이 있다면, 파싱
      const cacheData = JSON.parse(cacheValue);
      const now = Date.now();
      // 5분(=300,000ms) 이내인지 확인
      if (now - cacheData.timestamp < 300000) {
        post = cacheData.data;
        console.log("Post loaded from localStorage");
      }
    }

    // (2) 캐시가 없거나 5분이 넘었으면 API에서 받아오기
    if (!post) {
      const response = await fetch(`${apiUrl}/posts/${postId}`);
      if (!response.ok) throw new Error("Failed to fetch post detail");
      post = await response.json();

      // 받아온 데이터 localStorage에 저장
      const cacheData = {
        data: post,
        timestamp: Date.now(),
      };
      localStorage.setItem(cacheKey, JSON.stringify(cacheData));
      console.log("Post fetched from API");
    }

    // (3) 화면에 표시
    renderPost(post);
  } catch (error) {
    console.error("Error:", error.message);
    document.getElementById("post-detail").innerHTML =
      "<p>Error loading post details</p>";
  }
}

function renderPost(post) {
  const postDetail = document.getElementById("post-detail");
  postDetail.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
    `;
}

displayPostDetail();

function renderPost(post) {
  const postDetail = document.getElementById("post-detail");
  postDetail.innerHTML = `
        <div class="card-body">
            <h3 class="card-title">${post.title}</h3>
            <p class="card-text">${post.body}</p>
        </div>
    `;
}
