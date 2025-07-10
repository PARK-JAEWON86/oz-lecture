// star-pinter.js
// 콘솔에서 별 (*) 패턴을 출력하는 프로그램

// 입력값 유효성 검증 루프
let height;
do {
  height = Number(prompt("트리의 높이를 숫자로 입력하세요(1-10)"));
  if (isNaN(height) || height < 1 || height > 10) {
    console.log("잘못된 입력값 입니다! 1부터 10까지의 숫자를 입력하세요!");
    continue; // 잘못된 입력이면 다시 prompt
  }
  break; // 올바른 입력이면 루프 종료
} while (true);

// i: 1부터 height까지 한 줄씩
for (let i = 1; i <= height; i++) {
  // 1) 왼쪽 공백
  let spaces = "";
  for (let j = 0; j < height - i; j++) {
    spaces += " ";
  }

  // 2) 별(*) 생성
  let stars = "";
  for (let k = 0; k < 2 * i - 1; k++) {
    stars += "*";
  }

  // 3) 공백 + 별 합쳐서 출력
  console.log(spaces + stars);
}
