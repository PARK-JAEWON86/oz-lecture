async function fetchUser(userId) {
  try {
    console.log(userId);
  } catch (error) {
    console.log(error);
    showError(error.message);
  }
}

// path 파라미터에 매개변수로 받은 key값을 확인하여 value를 반환하는 함수
function getParams(key) {
  const url = new URL(location.href);
  const id = url.searchParams.get(key);
  return id;
}

function main() {
  const id = Number(getParams("userId"));
  console.log(id);
  fetchUser(id);
}

main();
