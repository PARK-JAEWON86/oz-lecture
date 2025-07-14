// dom_assignment.js

const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const clearButton = document.getElementById("clearButton");
const taskList = document.getElementById("taskList");
const currentDate = document.getElementById("currentDate");

// 오늘 날짜 표시
(function () {
  const now = new Date();
  currentDate.textContent = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
})();

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return alert("할 일을 입력해주세요!");

  const id = "task-" + Date.now();
  const li = document.createElement("li");
  li.className = "list-group-item";

  // 1행: 체크박스 + 텍스트 + 별
  const line1 = document.createElement("div");
  line1.className = "d-flex align-items-center";
  line1.innerHTML = `
    <div class="form-check flex-grow-1 ms-4">
      <input class="form-check-input" type="checkbox" id="${id}">
      <label class="form-check-label ms-1" for="${id}">${text}</label>
    </div>
    <button type="button" class="btn btn-link text-secondary p-0 ms-2 me-5" id="star-${id}">
      <i class="bi bi-star fs-4"></i>
    </button>
  `;
  // 완료 토글
  line1.querySelector("input").addEventListener("change", (e) => {
    const lbl = line1.querySelector("label");
    lbl.classList.toggle("text-decoration-line-through", e.target.checked);
    lbl.classList.toggle("text-secondary", e.target.checked);
  });
  // 별 토글
  const starBtn = line1.querySelector(`#star-${id}`);
  const starIcon = starBtn.querySelector("i");
  starBtn.addEventListener("click", () => {
    const filled = starIcon.classList.toggle("bi-star-fill");
    starIcon.classList.toggle("bi-star", !filled);
    starBtn.classList.toggle("text-warning", filled);
    starBtn.classList.toggle("text-secondary", !filled);
  });
  li.append(line1);

  // 2행: + 드롭다운 > 카테고리 뱃지 > 달력 > 날짜 뱃지
  const line2 = document.createElement("div");
  // mt-1 (0.25rem)로 텍스트 바로 아래, gap-2로 아이콘·뱃지 간격
  line2.className = "mt-1 d-flex align-items-center ms-4 gap-2";

  // ① “+” 드롭다운
  const dd = document.createElement("div");
  dd.className = "dropdown";
  dd.innerHTML = `
    <button
      class="btn btn-link text-secondary p-0 dropdown-toggle"
      type="button" id="dd-${id}"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <i class="bi bi-plus-lg fs-6"></i>
    </button>
    <ul class="dropdown-menu" aria-labelledby="dd-${id}">
      <li><a class="dropdown-item">Work</a></li>
      <li><a class="dropdown-item">Home</a></li>
      <li><a class="dropdown-item">HTML</a></li>
      <li><a class="dropdown-item">CSS</a></li>
      <li><a class="dropdown-item">JavaScript</a></li>
    </ul>
  `;
  line2.append(dd);

  // ② 카테고리 뱃지 컨테이너
  const catBox = document.createElement("div");
  catBox.className = "d-flex flex-wrap";
  line2.append(catBox);

  // 카테고리 토글 (추가/제거)
  dd.querySelectorAll(".dropdown-item").forEach((item) => {
    item.addEventListener("click", () => {
      const cat = item.textContent;
      const exist = [...catBox.children].find((b) => b.textContent === cat);
      if (exist) {
        exist.remove();
        return;
      }
      const badge = document.createElement("span");
      badge.className =
        "badge me-1 mb-1 small " +
        (cat === "Work"
          ? "bg-primary"
          : cat === "Home"
          ? "bg-success"
          : cat === "HTML"
          ? "bg-info text-dark"
          : cat === "CSS"
          ? "bg-warning text-dark"
          : "bg-danger");
      badge.textContent = cat;
      badge.addEventListener("click", () => badge.remove());
      catBox.append(badge);
    });
  });

  // ③ 달력 아이콘
  const calWrap = document.createElement("div");
  calWrap.className = "calendar-wrapper";
  calWrap.innerHTML = `
    <i class="bi bi-calendar-event fs-6 text-secondary"></i>
    <input type="date">
  `;
  line2.append(calWrap);

  const calIcon = calWrap.querySelector("i");
  const dateInp = calWrap.querySelector("input");

  calIcon.addEventListener("click", () => {
    if (typeof dateInp.showPicker === "function") dateInp.showPicker();
    else dateInp.focus();
  });

  // ④ 날짜 뱃지 컨테이너 (항상 한 번만 생성)
  const dueBox = document.createElement("div");
  dueBox.className = "d-flex flex-wrap ms-0 due-badges";
  line2.append(dueBox);

  // 날짜 변경 이벤트 (한 개만, 클릭 시 제거)
  dateInp.addEventListener("change", () => {
    const v = dateInp.value;
    if (!v) return;
    const d = new Date(v);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tm = new Date(today);
    tm.setDate(tm.getDate() + 1);
    let label = v;
    if (d.getTime() === today.getTime()) label = "Today";
    else if (d.getTime() === tm.getTime()) label = "Tomorrow";

    dueBox.innerHTML = ""; // 이전 뱃지 제거
    const b = document.createElement("span");
    b.className = "badge bg-info text-dark me-1 mb-1 small";
    b.textContent = label;
    b.addEventListener("click", () => b.remove());
    dueBox.append(b);
  });

  li.append(line2);
  taskList.append(li);

  taskInput.value = "";
  taskInput.focus();
}

// 전체 삭제
function clearAllTasks() {
  taskList.innerHTML = "";
}

// 이벤트 바인딩
addButton.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});
clearButton.addEventListener("click", clearAllTasks);
