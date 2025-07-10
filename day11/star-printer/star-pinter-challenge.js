// star-printer.js
// 콘솔에서 이모지(⭐) 패턴을 출력하는 프로그램

// 입력값 유효성 검증 루프
let height;
do {
  height = Number(prompt("트리의 높이를 숫자로 입력하세요(1-10)"));
  if (isNaN(height) || height < 1 || height > 10) {
    console.log("잘못된 입력값 입니다! 1부터 10까지의 숫자를 입력하세요!");
    continue;
  }
  break;
} while (true);

// 트리 출력: 👇 이모지 ⭐로 별 모양 그리기
for (let i = 1; i <= height; i++) {
  let spaces = "";
  for (let j = 0; j < height - i; j++) {
    spaces += " ";
  }

  let stars = "";
  for (let k = 0; k < 2 * i - 1; k++) {
    stars += "⭐";
  }

  console.log(spaces + stars);
}

// 도전 과제 1) 역순 별 출력: 함수 표현식 생성
const printReverseStars = function (count = 1) {
  console.log("=== 역순 출력 ===");
  if (!Number.isInteger(count) || count <= 0) {
    count = 1;
  }
  for (let i = count; i >= 1; i--) {
    let line = "";
    for (let j = 0; j < i; j++) {
      line += "⭐";
    }
    console.log(line);
  }
};

// 도전 과제 2) 사각형 패턴 출력
const printSquare = (count = 1) => {
  console.log("=== 사각형 패턴 출력 ===");
  if (!Number.isInteger(count) || count <= 0) {
    count = 1;
  }
  let block = "";
  for (let i = 0; i < count; i++) {
    block += "⭐".repeat(count) + "\n";
  }
  console.log(block);
};

// 도전 과제 3) for...in으로 객체 순회
const patterns = {
  stars: "⭐⭐⭐",
  heart: "❤️❤️❤️",
  sparkles: "✨✨✨",
};
const printPatterns = function () {
  console.log("=== 패턴 객체 순회 ===");
  for (const key in patterns) {
    console.log(`${key}: ${patterns[key]}`);
  }
};

// 도전 과제 4) ...rest 매개변수로 여러 숫자 처리
const printMultipleStars = (...counts) => {
  console.log("=== 여러 개 숫자 별 출력 ===");
  for (const cnt of counts) {
    let line = "";
    for (let i = 0; i < cnt; i++) {
      line += "⭐";
    }
    console.log(`별점${cnt}: ${line}`);
  }
};

// 도전 과제 5) 도전 과제 호출
console.log("----- 도전 과제 호출 -----");
printReverseStars(3);
printSquare(4);
printPatterns(2);
printMultipleStars(2, 5, 1);
