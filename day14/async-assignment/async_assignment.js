// async_assignment.js

// ────── 1. DOM 요소 가져오기 ──────
// 모드 전환 버튼
const timerBtn = document.getElementById("timerBtn");
const stopwatchBtn = document.getElementById("stopwatchBtn");
// 소리 토글 버튼 & 아이콘
const soundBtn = document.getElementById("soundBtn");
const soundIcon = document.getElementById("soundIcon");
// 전체화면 토글 버튼 & 아이콘
const fullscreenBtn = document.getElementById("fullscreenBtn");
const fullscreenIcon = document.getElementById("fullscreenIcon");
// 타이머 표시 영역
const timerDisplay = document.getElementById("timerDisplay");
// 힌트 및 에러 메시지 영역
const hintText = document.getElementById("hintText");
// 재생/일시정지 버튼 & 아이콘
const playPauseBtn = document.getElementById("playPause");
const playPauseIcon = playPauseBtn.querySelector("i");
// 초기화 버튼
const resetBtn = document.getElementById("resetBtn");
// 진행률 링(circle) 요소
const progressCircle = document.querySelector(".progress-ring__circle");

// ────── 2. 입력창 포커스 & Enter 동작 설정 ──────
// 포커스 시 기본 placeholder 삭제, 커서 위치 지정
timerDisplay.addEventListener("focus", () => {
  const txt = timerDisplay.textContent.trim();
  if (txt === "00:00" || txt === "0.00") {
    timerDisplay.textContent = "";
  }
  const range = document.createRange();
  range.selectNodeContents(timerDisplay);
  range.collapse(true);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
});

// Enter 키로 줄바꿈 대신 타이머 시작
timerDisplay.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    startTimer();
  }
});

// ────── 3. 진행률 링 초기 설정 ──────
// 반지름 RADIUS = 108, 둘레 계산
const RADIUS = 108;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
progressCircle.style.strokeDasharray = `${CIRCUMFERENCE}`;
progressCircle.style.strokeDashoffset = `${CIRCUMFERENCE}`;

// ────── 4. 상태 변수 ──────
let mode = "timer"; // 'timer' 또는 'stopwatch'
let duration = 0; // 타이머 총 길이(초)
let remaining = 0; // 남은 시간(초)
let startTime = 0; // 시작 시점(timestamp)
let elapsed = 0; // 경과 시간(초)
var timerId = null; // setInterval ID
let isPaused = false; // 일시정지 여부

// ────── 5. 유틸리티 함수 ──────
// 입력 문자열("mm:ss" 또는 "ss")을 초(소수)로 변환
function parseTime(str) {
  str = str.trim();
  if (str.includes(":")) {
    const [m, s] = str.split(":");
    const min = parseInt(m, 10);
    const sec = parseFloat(s);
    return !isNaN(min) && !isNaN(sec) ? min * 60 + sec : NaN;
  }
  const val = parseFloat(str);
  return isNaN(val) ? NaN : val;
}

// timerDisplay에 소수점 둘째 자리까지 표시
function updateDisplay(sec) {
  timerDisplay.textContent = sec.toFixed(2);
}

// 링(progress ring)을 0~1 비율(percent)로 업데이트
function setProgress(percent) {
  const offset = CIRCUMFERENCE * (1 - percent);
  progressCircle.style.strokeDashoffset = offset;
}

// 힌트/에러 메시지 표시
function showError(msg) {
  hintText.textContent = msg;
  hintText.classList.add("error");
}

// 힌트 기본 상태 복원
function clearError() {
  hintText.textContent = "1~10초를 입력하세요";
  hintText.classList.remove("error");
}

// ────── 6. 모드 전환 이벤트 ──────
timerBtn.addEventListener("click", () => {
  if (mode !== "timer") {
    mode = "timer";
    // 스타일 토글: timerBtn 활성, stopwatchBtn 비활성
    timerBtn.classList.replace("btn-primary", "btn-outline-light");
    timerBtn.classList.add("active");
    stopwatchBtn.classList.replace("btn-outline-light", "btn-primary");
    stopwatchBtn.classList.remove("active");
    // 초기화 UI
    clearError();
    timerDisplay.textContent = "00:00";
    setProgress(0);
  }
});

stopwatchBtn.addEventListener("click", () => {
  if (mode !== "stopwatch") {
    mode = "stopwatch";
    // 스타일 토글: stopwatchBtn 활성, timerBtn 비활성
    stopwatchBtn.classList.replace("btn-primary", "btn-outline-light");
    stopwatchBtn.classList.add("active");
    timerBtn.classList.replace("btn-outline-light", "btn-primary");
    timerBtn.classList.remove("active");
    // 초기화 UI
    clearError();
    timerDisplay.textContent = "00:00";
    setProgress(0);
  }
});

// ────── 7. 소리 토글 ──────
soundBtn.addEventListener("click", () => {
  if (soundIcon.classList.contains("bi-volume-up-fill")) {
    soundIcon.classList.replace("bi-volume-up-fill", "bi-volume-mute-fill");
  } else {
    soundIcon.classList.replace("bi-volume-mute-fill", "bi-volume-up-fill");
  }
});

// ────── 8. 전체화면 토글 ──────
fullscreenBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen?.();
    fullscreenIcon.classList.replace("bi-fullscreen", "bi-fullscreen-exit");
  } else {
    document.exitFullscreen?.();
    fullscreenIcon.classList.replace("bi-fullscreen-exit", "bi-fullscreen");
  }
});

// ────── 9. 재생/일시정지/초기화 컨트롤 ──────
playPauseBtn.addEventListener("click", () => {
  if (!timerId) startTimer();
  else if (!isPaused) pauseTimer();
  else resumeTimer();
});
resetBtn.addEventListener("click", resetTimer);

// ────── 10. 타이머/스톱워치 시작 함수 ──────
function startTimer() {
  clearError(); // 힌트 초기화

  const t = parseTime(timerDisplay.textContent);

  // 타이머 모드 유효성 검사
  if (mode === "timer") {
    if (isNaN(t) || t < 1 || t > 10) {
      showError("1~10초를 입력하세요");
      return;
    }
    duration = t;
    remaining = t;
  } else {
    duration = remaining = 0;
  }

  // 시작 준비
  startTime = performance.now();
  isPaused = false;

  // UI 업데이트
  resetBtn.classList.remove("d-none"); // 초기화 버튼 표시
  playPauseIcon.className = "bi bi-pause-fill";
  timerDisplay.contentEditable = false;
  timerBtn.disabled = stopwatchBtn.disabled = true;

  setProgress(0);
  updateDisplay(mode === "timer" ? remaining : 0);

  // 10ms 주기로 업데이트
  timerId = setInterval(updateLoop, 10);
}

// ────── 11. 매 프레임 업데이트 ──────
function updateLoop() {
  const now = performance.now();
  elapsed = (now - startTime) / 1000;

  if (mode === "timer") {
    remaining = duration - elapsed;
    if (remaining <= 0) return finishTimer();
    updateDisplay(remaining);
    setProgress((duration - remaining) / duration);
  } else {
    // 스톱워치 모드: 경과 시간 표시
    updateDisplay(elapsed);
  }
}

// ────── 12. 일시정지 / 재개 / 종료 / 초기화 ──────
function pauseTimer() {
  clearInterval(timerId);
  timerId = null;
  isPaused = true;
  playPauseIcon.className = "bi bi-play-fill";
}

function resumeTimer() {
  const offset = mode === "timer" ? duration - remaining : elapsed;
  startTime = performance.now() - offset * 1000;
  isPaused = false;
  playPauseIcon.className = "bi bi-pause-fill";
  timerId = setInterval(updateLoop, 10);
}

function finishTimer() {
  clearInterval(timerId);
  timerId = null;
  updateDisplay(0);
  setProgress(1);
  playPauseIcon.className = "bi bi-play-fill";
  timerBtn.disabled = stopwatchBtn.disabled = false;
  timerDisplay.contentEditable = true;
}

function resetTimer() {
  clearInterval(timerId);
  timerId = null;
  isPaused = false;
  duration = remaining = 0;
  playPauseIcon.className = "bi bi-play-fill";
  resetBtn.classList.add("d-none");
  timerBtn.disabled = stopwatchBtn.disabled = false;
  timerDisplay.contentEditable = true;
  clearError();
  timerDisplay.textContent = "00:00";
  setProgress(0);
}
