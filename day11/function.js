// 구구단 3단 코드

for (let i = 1; i <= 9; i++) {
  console.log(`3 x ${i} = ${3 * 1}`);
}

function gugudan() {
  // 함수 정의
  for (let i = 1; i <= 9; i++) {
    console.log(`3 x ${i} = ${3 * 1}`);
  }
}
gugudan(); // 함수 실행

// 함수 정의 - 함수 표현식
const gugudan4 = function () {
  for (let i = 1; i <= 9; i++) {
    console.log(`4 x ${i} = ${4 * 1}`);
  }
};
