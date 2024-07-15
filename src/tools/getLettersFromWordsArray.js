export function getLettersFromWordsArray(arr) {
  let letterCounts = {};

  for (let str of arr) {
    let currentCount = {};

    for (let char of str) {
      if (currentCount[char]) {
        currentCount[char]++;
      } else {
        currentCount[char] = 1;
      }
    }

    for (let char in currentCount) {
      if (letterCounts[char]) {
        letterCounts[char] = Math.max(letterCounts[char], currentCount[char]);
      } else {
        letterCounts[char] = currentCount[char];
      }
    }
  }

  let result = [];
  for (let char in letterCounts) {
    for (let i = 0; i < letterCounts[char]; i++) {
      result.push(char);
    }
  }

  return result;
}
