// 도서 데이터를 저장할 배열
const books = [];
// 대여 상태를 관리할 배열
const rentals = [];

// 도서 추가 기능
function addBook() {
  const titleInput = document.getElementById("bookTitle");
  const priceInput = document.getElementById("bookPrice");
  const title = titleInput.value.trim();
  const price = Number(priceInput.value);

  if (title === "" || isNaN(price) || price <= 0) {
    alert("도서 제목과 유효한 가격(0 이상)을 입력하세요!");
    return;
  }

  // 배열에 데이터 저장 및 대여 상태 클로저 생성
  books.push({ title, price });
  rentals.push(createBookRental(title));

  // DOM에 리스트 아이템 추가
  const bookList = document.getElementById("bookList");
  const li = document.createElement("li");
  li.className =
    "list-group-item book-item d-flex justify-content-between align-items-center";
  li.innerHTML = `
    <div>
      <span class="book-info">${title} - ${price.toLocaleString()}원</span>
      <span class="badge bg-success ms-2">대여 가능</span>
    </div>
    <div>
      <button type="button" class="btn btn-outline-danger btn-sm" onclick="removeBook(this)">삭제</button>
      <button type="button" class="btn btn-outline-primary btn-sm ms-1" onclick="toggleRental(this)">대여/반납</button>
    </div>
  `;
  bookList.appendChild(li);

  // 입력 초기화
  titleInput.value = "";
  priceInput.value = "";
}

// 삭제 기능
function removeBook(button) {
  const li = button.closest("li");
  if (!li) return;
  const title = li.querySelector(".book-info").textContent.split(" - ")[0];
  const bi = books.findIndex((b) => b.title === title);
  if (bi > -1) books.splice(bi, 1);
  const ri = rentals.findIndex((r) => r.getStatus().title === title);
  if (ri > -1) rentals.splice(ri, 1);
  li.remove();
}

// 도서 처리 기능: 상위 가격과 고가 도서를 좌우 배치, 순위 표시, 총 가격 카드 표시
function processBooks() {
  // 가격 기준 내림차순 정렬
  const sortedBooks = [...books].sort((a, b) => b.price - a.price);
  // 고가 도서 필터링 (10,000원 이상), 정렬 유지
  const highPriceBooks = sortedBooks.filter((b) => b.price >= 10000);
  // 총 가격 계산
  const totalPrice = books.reduce((sum, b) => sum + b.price, 0);

  const resultsDiv = document.getElementById("results");
  let html = `<div class="row">`;

  // 왼쪽: 상위 가격 도서
  html += `<div class="col-md-6">
    <div class="card mb-3">
      <div class="card-header">상위 가격 도서</div>
      <div class="card-body">
        <ul class="list-group list-group-flush">`;
  if (sortedBooks.length === 0) {
    html += `<li class="list-group-item">도서가 없습니다.</li>`;
  } else {
    sortedBooks.forEach((b, idx) => {
      html += `<li class="list-group-item">${idx + 1}위 ${
        b.title
      } - ${b.price.toLocaleString()}원</li>`;
    });
  }
  html += `</ul>
      </div>
    </div>
  </div>`;

  // 오른쪽: 고가 도서
  html += `<div class="col-md-6">
    <div class="card mb-3">
      <div class="card-header">고가 도서 (10,000원 이상)</div>
      <div class="card-body">
        <ul class="list-group list-group-flush">`;
  if (highPriceBooks.length === 0) {
    html += `<li class="list-group-item">고가 도서가 없습니다.</li>`;
  } else {
    highPriceBooks.forEach((b, idx) => {
      html += `<li class="list-group-item">${idx + 1}위 ${
        b.title
      } - ${b.price.toLocaleString()}원</li>`;
    });
  }
  html += `</ul>
      </div>
    </div>
  </div>`;

  html += `</div>`; // .row 종료

  // 총 가격 카드
  html += `<div class="card">
    <div class="card-header">총 가격</div>
    <div class="card-body">
      <p class="card-text">${totalPrice.toLocaleString()}원</p>
    </div>
  </div>`;

  resultsDiv.innerHTML = html;
}

// 대여 상태 관리 클로저
const createBookRental = (title) => {
  let isBorrowed = false,
    borrowCount = 0;
  return {
    borrow() {
      if (isBorrowed) {
        alert(`${title}은 이미 대여 중입니다.`);
        return false;
      }
      isBorrowed = true;
      borrowCount++;
      return true;
    },
    returnBook() {
      isBorrowed = false;
    },
    getStatus() {
      return { title, isBorrowed, borrowCount };
    },
  };
};

// 대여/반납 토글 기능
function toggleRental(btn) {
  const li = btn.closest("li");
  if (!li) return;
  const title = li.querySelector(".book-info").textContent.split(" - ")[0];
  const rental = rentals.find((r) => r.getStatus().title === title);
  if (!rental) return;
  const badge = li.querySelector(".badge");
  if (rental.getStatus().isBorrowed) {
    rental.returnBook();
    badge.textContent = "대여 가능";
    badge.classList.replace("bg-danger", "bg-success");
  } else if (rental.borrow()) {
    badge.textContent = "대여 중";
    badge.classList.replace("bg-success", "bg-danger");
  }
}

// 전체 대여 상태 보기
function showAllRentalStatus() {
  const available = rentals.filter((r) => !r.getStatus().isBorrowed);
  const borrowed = rentals.filter((r) => r.getStatus().isBorrowed);
  const resultsDiv = document.getElementById("results");
  let html = `<div class="row">`;

  // 왼쪽: 대여 가능 도서
  html += `<div class="col-md-6">
    <div class="card mb-3">
      <div class="card-header">대여 가능 도서</div>
      <div class="card-body">
        <ul class="list-group list-group-flush">`;
  if (available.length === 0) {
    html += `<li class="list-group-item">대여 가능 도서가 없습니다.</li>`;
  } else {
    available.forEach((r) => {
      const { title, borrowCount } = r.getStatus();
      html += `<li class="list-group-item d-flex justify-content-between align-items-center">${title}
        <span class="badge bg-primary">${borrowCount}회</span>
      </li>`;
    });
  }
  html += `</ul>
      </div>
    </div>
  </div>`;

  // 오른쪽: 대여 중 도서
  html += `<div class="col-md-6">
    <div class="card mb-3">
      <div class="card-header">대여 중 도서</div>
      <div class="card-body">
        <ul class="list-group list-group-flush">`;
  if (borrowed.length === 0) {
    html += `<li class="list-group-item">대여 중 도서가 없습니다.</li>`;
  } else {
    borrowed.forEach((r) => {
      const { title, borrowCount } = r.getStatus();
      html += `<li class="list-group-item d-flex justify-content-between align-items-center">${title}
        <span class="badge bg-danger">${borrowCount}회</span>
      </li>`;
    });
  }
  html += `</ul>
      </div>
    </div>
  </div>`;

  html += `</div>`; // .row 종료

  resultsDiv.innerHTML = html;
}
