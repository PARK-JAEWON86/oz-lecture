// String.length
const pw = "123";
console.log(pw.length);
if (pw.length < 4) {
  console.log("최소4자리 입력하세요!");
}

// String.includes{}
const email = "test!naver.com";
console.log(email.includes("@"));

if (!email.includes("@")) {
  // @가 포함되어 있지 않으면,
  console.log("이메일 형식 확인하세요");
}

console.log(email[0]);
console.log(email[1]);
console.log(email[2]);
console.log(email[3]);
console.log(email.indexOf("@"));
console.log(email.indexOf("asdjlkhfeulfjkasd")); // -1

if (email.indexOf("@") < 0) {
  //@가 포함되어 있지 않으면,
  console.log("이메일 형식 확인하세요!");
}

// 객체 내의 함수 사용하기
// person.printInfo();
const fullName = person.getFullName();
console.log("fullName :", fullName);

// 객체에 속성 추가 / 삭제
person.like = "apple";
person.koreaAge = 22;
person.likes = ["taegu", "coffee", 2, true];

delete person.isAdult;
console.log(person);
