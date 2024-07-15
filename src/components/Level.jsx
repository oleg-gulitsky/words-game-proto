import { useEffect, useState } from "react";

import { LettersInput } from "./LettersInput.jsx";
import { WordsList } from "./WordsList.jsx";
import { LetterCell } from "./LetterCell.jsx";

import { getLevelWordsAndLetters } from "../tools/getLevelWordsAndLetters.js";
import { usePersistState } from "../state/index.jsx";

export function Level(props) {
  const { onLevelCompleted } = props;
  const { openWordIndexes, addOpenWordIndex, currentLevel } = usePersistState();

  const { words, letters } = getLevelWordsAndLetters(currentLevel);

  const [selectedLetterIndexes, setSelectedLetterIndexes] = useState([]);

  const handleLevelCompleted = () => {
    onLevelCompleted();
  };

  useEffect(() => {
    if (openWordIndexes.length === words.length) {
      setTimeout(handleLevelCompleted, 200);
    }
  }, [openWordIndexes]);

  const handleInputStop = () => {
    const currentInputString = selectedLetterIndexes.reduce(
      (str, index) => str + letters[index],
      ""
    );
    const wordIndex = words.indexOf(currentInputString);

    if (~wordIndex && !openWordIndexes.includes(wordIndex)) {
      addOpenWordIndex(wordIndex);
    }

    setSelectedLetterIndexes([]);
  };

  return (
    <div
      onPointerUp={handleInputStop}
      onTouchEnd={handleInputStop}
      style={styles.container}
    >
      <p style={styles.title}>Уровень {currentLevel}</p>
      <WordsList words={words} openWordIndexes={openWordIndexes} />
      <div style={styles.currentString}>
        {selectedLetterIndexes.map((index) => (
          <LetterCell
            key={index}
            letter={letters[index]}
            cellSize={3.7}
            margin={2}
            fontSize={2.64}
            fontHeight={4.84}
          />
        ))}
      </div>
      <LettersInput
        letters={letters}
        selectedLetterIndexes={selectedLetterIndexes}
        onInput={setSelectedLetterIndexes}
      />
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontFamily: "VAG World",
    fontSize: "2.64vh",
    lineHeight: "3.08vh",
    margin: 0,
    marginTop: "2.38vh",
  },
  currentString: {
    marginTop: "1.76vh",
    display: "flex",
    flexDirection: "row",
    height: "2.64vh",
  },
};
