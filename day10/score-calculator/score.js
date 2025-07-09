// 0. 입력 받기 & 숫자 변환
let inputStr = prompt("점수를 입력하세요."); // 문자열 입력
console.log("입력값(문자열):", inputStr);
let score = parseInt(inputStr); // 문자열 → 정수
console.log("입력값(숫자):", score);

// 1. 입력 유효성 검사 (논리 연산자 ||, 단항 부정 ! 사용)
/*
   - isNaN(score): 숫자가 아닌 경우
   - score < 0 또는 score > 100: 범위 벗어날 경우
*/
if (isNaN(score) || score < 0 || score > 100) {
  console.log("Invalid score! Please enter a number between 0 and 100.");
  // 여기서 종료: 이후 코드는 실행되지 않음
} else {
  // 2. 단항 산술: 1점 증가
  score++; // score = score + 1

  // 3. 복합 대입: 5점 보너스 추가
  score += 5; // score = score + 5

  // 4. 복합 대입: 10% 스케일링
  score *= 1.1; // score = score * 1.1

  // 5. 최대치 제한: 100 초과 시 100으로 고정
  if (score > 100) score = 100;

  // (선택) 소수점 이하 버리기
  score = Math.floor(score);

  // 6. 등급 결정 (if / else if)
  var grade;
  if (score === 100) {
    grade = "A"; // 100점도 A 등급으로 처리하되, 메시지는 아래 switch에서 특수 case!
  } else if (score >= 90) {
    grade = "A";
  } else if (score >= 80) {
    grade = "B";
  } else if (score >= 70) {
    grade = "C";
  } else if (score >= 60) {
    grade = "D";
  } else {
    grade = "F";
  }

  // 7. 합격/불합격 여부 (삼항 연산자)
  let status = score >= 60 ? "Pass" : "Fail";

  // 8. 결과 출력
  console.log("Final Score:", score);
  console.log("Grade:", grade);
  console.log("Status:", status);

  // 9. 등급별 메시지 (switch + 특수 case)
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
    case grade === "F":
      console.log("Message: Please try harder!");
      break;
    default:
      console.log("Message: No message available.");
  }
}
