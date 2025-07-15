// async_assignment.js

// DOM elements
const timerBtn = document.getElementById("timerBtn");
const stopwatchBtn = document.getElementById("stopwatchBtn");
const soundBtn = document.getElementById("soundBtn");
const soundIcon = document.getElementById("soundIcon");
const fullscreenBtn = document.getElementById("fullscreenBtn");
const fullscreenIcon = document.getElementById("fullscreenIcon");
const timerDisplay = document.getElementById("timerDisplay");
const hintText = document.getElementById("hintText");
const playPauseBtn = document.getElementById("playPause");
const playPauseIcon = playPauseBtn.querySelector("i");
const resetBtn = document.getElementById("resetBtn");
const progressCircle = document.querySelector(".progress-ring__circle");

// ① 포커스 시 기본값 지우고 커서 맨 앞 배치
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

// ② Enter키 누르면 줄바꿈 대신 타이머 시작
timerDisplay.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    startTimer();
  }
});

// progress ring setup
const RADIUS = 108;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
progressCircle.style.strokeDasharray = `${CIRCUMFERENCE}`;
progressCircle.style.strokeDashoffset = `${CIRCUMFERENCE}`;

// state variables
let mode = "timer";
let duration = 0;
let remaining = 0;
let startTime = 0;
let elapsed = 0;
var timerId = null;
let isPaused = false;

// utility: parse input "mm:ss" or "ss" to seconds
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

// update display
function updateDisplay(sec) {
  timerDisplay.textContent = sec.toFixed(2);
}

// update ring
function setProgress(percent) {
  const offset = CIRCUMFERENCE * (1 - percent);
  progressCircle.style.strokeDashoffset = offset;
}

// show / clear hint or error
function showError(msg) {
  hintText.textContent = msg;
  hintText.classList.add("error");
}
function clearError() {
  hintText.textContent = "1~10초를 입력하세요";
  hintText.classList.remove("error");
}

// mode toggle
timerBtn.addEventListener("click", () => {
  if (mode !== "timer") {
    mode = "timer";
    timerBtn.classList.replace("btn-primary", "btn-outline-light");
    timerBtn.classList.add("active");
    stopwatchBtn.classList.replace("btn-outline-light", "btn-primary");
    stopwatchBtn.classList.remove("active");
    clearError();
    timerDisplay.textContent = "00:00";
    setProgress(0);
  }
});
stopwatchBtn.addEventListener("click", () => {
  if (mode !== "stopwatch") {
    mode = "stopwatch";
    stopwatchBtn.classList.replace("btn-primary", "btn-outline-light");
    stopwatchBtn.classList.add("active");
    timerBtn.classList.replace("btn-outline-light", "btn-primary");
    timerBtn.classList.remove("active");
    clearError();
    timerDisplay.textContent = "00:00";
    setProgress(0);
  }
});

// sound toggle
soundBtn.addEventListener("click", () => {
  if (soundIcon.classList.contains("bi-volume-up-fill")) {
    soundIcon.classList.replace("bi-volume-up-fill", "bi-volume-mute-fill");
  } else {
    soundIcon.classList.replace("bi-volume-mute-fill", "bi-volume-up-fill");
  }
});

// fullscreen toggle
fullscreenBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen?.();
    fullscreenIcon.classList.replace("bi-fullscreen", "bi-fullscreen-exit");
  } else {
    document.exitFullscreen?.();
    fullscreenIcon.classList.replace("bi-fullscreen-exit", "bi-fullscreen");
  }
});

// play/pause/reset controls
playPauseBtn.addEventListener("click", () => {
  if (!timerId) startTimer();
  else if (!isPaused) pauseTimer();
  else resumeTimer();
});
resetBtn.addEventListener("click", resetTimer);

// start timer or stopwatch
function startTimer() {
  clearError();
  const t = parseTime(timerDisplay.textContent);
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
  startTime = performance.now();
  isPaused = false;
  resetBtn.classList.remove("d-none");
  playPauseIcon.className = "bi bi-pause-fill";
  timerDisplay.contentEditable = false;
  timerBtn.disabled = stopwatchBtn.disabled = true;
  setProgress(0);
  updateDisplay(mode === "timer" ? remaining : 0);
  timerId = setInterval(updateLoop, 10);
}

// update loop
function updateLoop() {
  const now = performance.now();
  elapsed = (now - startTime) / 1000;
  if (mode === "timer") {
    remaining = duration - elapsed;
    if (remaining <= 0) return finishTimer();
    updateDisplay(remaining);
    setProgress((duration - remaining) / duration);
  } else {
    updateDisplay(elapsed);
  }
}

// pause / resume / finish / reset
function pauseTimer() {
  clearInterval(timerId);
  timerId = null;
  isPaused = true;
  playPauseIcon.className = "bi bi-play-fill";
  resetBtn.classList.remove("d-none");
}

function resumeTimer() {
  const offset = mode === "timer" ? duration - remaining : elapsed;
  startTime = performance.now() - offset * 1000;
  isPaused = false;
  playPauseIcon.className = "bi bi-pause-fill";
  resetBtn.classList.add("d-none");
  timerId = setInterval(updateLoop, 10);
}

function finishTimer() {
  clearInterval(timerId);
  timerId = null;
  updateDisplay(0);
  setProgress(1);
  playPauseIcon.className = "bi bi-play-fill";
  resetBtn.classList.remove("d-none");
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

  // ← 이 부분만 바꿔서 원래 placeholder 복원
  timerDisplay.textContent = "00:00";
  setProgress(0);
}
