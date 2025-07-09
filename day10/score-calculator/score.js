// 사용자 입력
let inputStr = prompt("점수를 입력하세요."); // 1) prompt 창에 나타난 입력값은 문자열(string)입니다.
console.log("입력한 점수 : ", inputStr); // 2) 입력된 문자열을 콘솔에 찍어 봐서 확인해요.
let input = parseInt(inputStr); // 3) parseInt()로 문자열을 정수(number)로 변환합니다.
console.log("입력한 점수 재확인 : ", input); // 4) 숫자로 제대로 변환됐는지 다시 확인해요.

const MAX_SCORE = 105; // 최대 점수 (100 + 보너스 5)
let score; // 최종 점수를 저장할 변수 (let 사용)
var grade; // 등급을 저장할 변수 (var 사용)

// 1. 최종점수 계산 (5점 추가)
score = input + 5; // 이항 산술 연산자 +를 사용해 5점을 더해 줍니다.

// 2. 등급 결정 (if문)
if (score >= 100) {
  // score가 100 이상이면
  grade = "S"; // S 등급
} else if (score >= 90) {
  // 90 이상 100 미만이면
  grade = "A";
} else if (score >= 80) {
  // 80 이상 90 미만이면
  grade = "B";
} else if (score >= 70) {
  // 70 이상 80 미만이면
  grade = "C";
} else if (score >= 60) {
  // 60 이상 70 미만이면
  grade = "D";
} else {
  // 그 외 (60 미만)
  grade = "F";
}

// 3. 합격/불합격 여부 결정 (삼항 연산자)
let status = score >= 60 ? "Pass" : "Fail"; // score가 60 이상이면 'Pass', 아니면 'Fail'

// 4. 결과 출력
console.log("Final Score: " + score); // 최종 점수
console.log("Grade: " + grade); // 등급
console.log("Status: " + status); // 합격/불합격

// 5. 등급에 따른 메시지 출력 (switch문)
switch (grade) {
  case "S":
    console.log("Message: Super!!");
    break;
  case "A":
    console.log("Message: Excellent work!");
    break;
  case "B":
    console.log("Message: Good job!");
    break;
  case "C":
    console.log("Message: Satisfactory performance.");
    break;
  case "D":
    console.log("Message: Needs improvement.");
    break;
  case "F":
    console.log("Message: Please try harder!");
    break;
  default:
    // 혹시 grade 변수가 예상 밖의 값일 때를 대비한 안전 장치
    console.log("Message: No message available.");
}
