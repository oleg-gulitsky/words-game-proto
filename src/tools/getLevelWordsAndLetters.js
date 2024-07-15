import level1 from "../levels/1.json";
import level2 from "../levels/2.json";
import level3 from "../levels/3.json";

const LEVELS = [level1.words, level2.words, level3.words];

import { getLettersFromWordsArray } from "./getLettersFromWordsArray";

export function getLevelWordsAndLetters(levelNumber) {
  // console.log("levelNumber", levelNumber);
  const index = (levelNumber - 1) % LEVELS.length;
  const words = LEVELS[index].sort((a, b) => a.length - b.length);
  // console.log("words", words);
  const letters = getLettersFromWordsArray(words);

  return { words, letters };
}
