// 0. 원점수 입력 받기 & 숫자 변환
let rawStr = prompt("원점수를 입력하세요 (0~100):");
console.log("원점수(문자열):", rawStr);
let score = parseInt(rawStr);
console.log("원점수(숫자):", score);

// 1. 추가 보너스 여부 입력 (yes/no)
let firstPlace = prompt("과제 제출 1등인가요? (yes/no):").toLowerCase();
let everyoneSubmitted = prompt(
  "과제 제출을 모두 했나요? (yes/no):"
).toLowerCase();
let goodAttitude = prompt("학습 태도가 좋나요? (yes/no):").toLowerCase();

// 2. 입력 유효성 검사
if (isNaN(score) || score < 0 || score > 100) {
  console.log("Invalid score! Please enter a number between 0 and 100.");
} else {
  // 3. 1등 보너스: +1점
  if (firstPlace === "yes") {
    score++;
    console.log("1) 과제제출 1등 보너스 +1점 →", score);
  } else {
    console.log("1) 과제제출 1등 보너스 없음 →", score);
  }

  // 4. 모두 제출 보너스: +5점
  if (everyoneSubmitted === "yes") {
    score += 5;
    console.log("2) 과제제출 모두 보너스 +5점 →", score);
  } else {
    console.log("2) 과제제출 모두 보너스 없음 →", score);
  }

  // 5. 학습 태도 보너스: +10%
  if (goodAttitude === "yes") {
    score *= 1.1;
    console.log("3) 학습태도 보너스 +10% 적용 후 →", score.toFixed(2));
  } else {
    console.log("3) 학습태도 보너스 없음 →", score);
  }

  // 6. 최대치 제한(100) 및 정수 처리
  if (score > 100) score = 100;
  score = Math.floor(score);
  console.log("Final Score (최종 점수):", score);

  // 7. 등급 부여
  let grade;
  if (score >= 90) grade = "A";
  else if (score >= 80) grade = "B";
  else if (score >= 70) grade = "C";
  else if (score >= 60) grade = "D";
  else grade = "F";
  console.log("Grade (등급):", grade);

  // 8. 합/불 판정
  let status = score >= 60 ? "Pass" : "Fail";
  console.log("Status (합격여부):", status);

  // 9. 메시지 출력
  switch (true) {
    case score === 100:
      console.log("Message: Perfect Score!");
      break;
    case grade === "A":
      console.log("Message: Excellent work!");
      break;
    case grade === "B":
      console.log("Message: Good job!");
      break;
    case grade === "C":
      console.log("Message: Satisfactory performance.");
      break;
    case grade === "D":
      console.log("Message: Needs improvement.");
      break;
    default:
      console.log("Message: Please try harder!");
  }
}
