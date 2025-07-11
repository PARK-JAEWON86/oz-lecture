let movies = []; // 배열 선언

// 영호 객체 하드코딩
movies.push({
  제목: "매드맥스 분노의도로",
  감독: "조지밀러",
  개봉일: 2015,
  장르: "액션-어드벤쳐",
  관객수: 3949545,
});
movies.push({
  제목: "인셉션",
  감독: "크리스토퍼 놀란",
  개봉일: 2010,
  장르: "액션",
  관객수: 6014577,
});
movies.push({
  제목: "기생충",
  감독: "봉준호",
  개봉일: 2019,
  장르: "블랙코미디",
  관객수: 10316960,
});
movies.push({
  제목: "인터스텔라",
  감독: "크리스토퍼 놀란",
  개봉일: 2014,
  장르: "SF",
  관객수: 10380296,
});
movies.push({
  제목: "물랑루즈",
  감독: "베즈 루어먼",
  개봉일: 2001,
  장르: "로맨스",
  관객수: 530812,
});
movies.push({
  제목: "어벤져스-엔드게임",
  감독: "앤서니루소,조 루소",
  개봉일: 2019,
  장르: "SF",
  관객수: 13977602,
});

console.log(movies);

//함수 선언문으로 출력하기
function printMovies(list) {
  // 여기에 list 라는 이름으로 배열을 받는다
  console.log("Movie Collection");
  for (let i = 0; i < list.length; i++) {
    const m = list[i];
    // 빈 값 체크: 제목,감독,장르가 없으면 "알수없음"으로
    if (!m.제목) m.제목 = "알수없음";
    if (!m.감독) m.감독 = "알수없음";
    if (!m.개봉일) m.개봉일 = "알수없음";
    if (!m.장르) m.장르 = "알수없음";
    // 출력
    // ★ toLocaleString() 적용 ★
    const formattedAudience = m.관객수.toLocaleString("ko-KR");
    console.log(
      `${i + 1}.제목:${m.제목}, 감독:${m.감독}, 개봉일:${m.개봉일}, 장르:${
        m.장르
      }, 관객수:${formattedAudience}명`
    );
  }
  // var 사용 예시로 총 개수 찍기
  var count = list.length;
  console.log(`Total Movies: ${count}`);
}

printMovies(movies);

console.log("---------------------------------------------------------------");

// 평균 개봉년도 계산 함수

const calculateAverageYear = function (list = []) {
  if (list.length === 0) return 0; // 빈 배열일 땐 0 반환
  const totalYear = list.reduce((sum, m) => sum + m.개봉일, 0);
  return totalYear / list.length;
};
console.log(`평균 개봉년도: ${calculateAverageYear(movies)}`);

console.log("---------------------------------------------------------------");
// 특정 장르 검색 함수 만들기
function printMoviesByGenre(list, genre = "") {
  // 함수 선언문을 작성합니다. 기본 장르를 빈 문자열로 두고, genre 매개변수로 검색할 장르를 받스빈다.
  console.log(`${genre} Movies:`);
  let foundCount = 0;
  for (let i = 0; i < list.length; i++) {
    // for 반복문으로 배열을 돌면서 장르가 일치하면 출력하고 카운트합니다.
    const m = list[i];
    if (m.장르 === genre) {
      foundCount++;
      console.log(
        `${foundCount}. 제목: ${m.제목}, 감독: ${m.감독}, 개봉일: ${m.개봉일}, 장르: ${m.장르},`
      );
    }
  } // 결과가 없으면 "찾을 수 없음" 메시지를 출력하도록 합니다
  if (foundCount === 0) {
    console.log(`해당하는 장르를 찾을 수 없습니다.: ${genre}`);
  }
}

printMoviesByGenre(movies, "SF");

console.log("---------------------------------------------------------------");

// 가장 최신 영화 찾기 함수

const findNewestMovie = (list = []) => {
  if (list.length === 0) return null;
  return list.reduce((newest, m) => (m.개봉일 > newest.개봉일 ? m : newest));
};

const newest = findNewestMovie(movies);
console.log(`최신개봉영화: ${newest.제목}(${newest.개봉일})`);

console.log("---------------------------------------------------------------");

// ...rest로 영화 여러 개 추가하기
function addMovies(list, ...newItems) {
  for (let m of newItems) {
    list.push(m);
  }
}

addMovies(
  movies,
  {
    제목: "라라랜드",
    감독: "데미엔 차젤레",
    개봉일: 2016,
    장르: "뮤지컬",
    관객수: 3793404,
  },
  {
    제목: "조커",
    감독: "토드 필립스",
    개봉일: 2019,
    장르: "범죄",
    관객수: 5281095,
  }
);
printMovies(movies);

console.log("---------------------------------------------------------------");

//  관객수 기준 순위 출력 함수
function printRankingByAudience(list) {
  const sorted = [...list].sort((a, b) => b.관객수 - a.관객수);
  console.log("관객수 순위:");
  for (let i = 0; i < sorted.length; i++) {
    const m = sorted[i];
    const formattedAudience = m.관객수.toLocaleString("ko-KR");
    console.log(`${i + 1}위: ${m.제목} (관객수: ${formattedAudience}명)`);
  }
}

printRankingByAudience(movies);
