// ── 1. 변수 선언 ──
// var, let, const 각각 1회 이상 사용
var userName = "박재원"; // 문자열 (string)
let userAge = 20; // 숫자 (number)
const isStudent = false; // 불리언 (boolean)

// ── 2. 문자열 처리 ──
// 이스케이프 문자(\n, \t)와 + 연산자로 프로필 정보 출력
console.log(
  "- 나의 프로필 -\n" +
    "\t이름: " +
    userName +
    "\n" +
    "\t나이: " +
    userAge +
    "\n" +
    "\t학생인가? " +
    isStudent
);

// ── 3. 배열 리터럴 ──
// 취미 3개를 배열에 저장하고, 요소를 하나씩 꺼내어 문자열로 결합
const hobbies = ["독서", "게임", "코딩"];
console.log("내 취미: " + hobbies[0] + ", " + hobbies[1] + ", " + hobbies[2]);

// ── 4. 객체 리터럴 ──
// 이름·나이·학생 여부를 속성으로 가진 객체 선언
const profile = {
  name: userName,
  age: userAge,
  isStudent: isStudent,
};
// 객체 속성 사용해 출력
console.log(
  "프로필 → 이름: " +
    profile.name +
    ", 나이: " +
    profile.age +
    ", 학생여부: " +
    profile.isStudent
);

// ── 5. typeof 연산자 ──
// 배열과 객체의 타입을 확인
console.log("hobbies의 타입:", typeof hobbies); // object
console.log("profile의 타입:", typeof profile); // object
