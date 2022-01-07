// 선입선출 함수
function FIFO(record1) {
  let record = record1.slice();
  let sellAmount = 0;
  let result = 0;
  // 선입선출이기에 판매된 양을 먼저 정리해줍니다. 이후 판매내역은 배열에서 제거합니다.
  record = record.filter((v) => {
    if (v[0] === "S") sellAmount += parseInt(v[2]);
    return v[0] === "P";
  });

  let index = 0;
  // 선입선출이기에 사들인 재료들에 따라 하나씩 카운트를 제거하며 이익에서 물건값을 빼줍니다.
  while (sellAmount > 0) {
    if (record[index][2] === 0) index++; // 먼저 들여온 물건이 다 팔리면 다음 물건으로 넘어갑니다.
    result += parseInt(record[index][1]);
    sellAmount--;
  }
  return result;
}

// 선입후출함수
function FILO(record1) {
  let result = 0;
  let record = record1.slice();
  // 선입후출이기에 순서대로 데이터를 읽어가며 스택을 이용해줍니다.
  let stack = [];
  record.forEach((v) => {
    // 만약 구매라면 스택에 넣어줍니다.
    if (v[0] === "P") stack.push(v);
    else {
      let index = stack.length - 1;
      while (v[2] > 0) {
        // 판매일경우 가장 최근에 샀던 물건을 하나씩 빼주며 결과값을 더해줍니다.
        if (stack[index][2] === 0) {
          stack.pop(); // 최근에 산 물건을 다 팔았다면 스택에서 제거해주고 다음 최근에 산 물건들로 계산해줍니다.
          index--;
        }
        result += parseInt(stack[index][1]);
        stack[index][2]--;
        v[2]--;
      }
    }
  });
  return result;
}

function solution(record) {
  let answer = [];
  record = record.map((v) => v.split(" ")); // 배열 쓰기쉽게 가공
  answer.push(FIFO(record));
  answer.push(FILO(record));
  return answer;
}

console.log(
  solution(["P 100 4", "P 300 9", "S 1000 7", "P 1000 8", "S 700 7", "S 700 3"])
);
