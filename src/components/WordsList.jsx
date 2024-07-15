import { usePersistState } from "../state/index.jsx";
import { LetterCell } from "./LetterCell.jsx";

const CELL_SIZE = 6;
const FONT_SIZE = 3.96;
const FONT_HEIGHT = 7.04;

export function WordsList(props) {
  const { words } = props;
  const { openWordIndexes } = usePersistState();
  const isLotWords = words.length > 6;
  return (
    <div style={styles.container}>
      {words.map((word, index) => {
        const isWordOpen = openWordIndexes.includes(index);

        return (
          <div style={styles.word} key={word}>
            {word.split("").map((letter, i) => (
              <LetterCell
                key={i + letter}
                letter={isWordOpen ? letter : null}
                isOpen={isWordOpen}
                cellSize={isLotWords ? CELL_SIZE * 0.55 : CELL_SIZE}
                fontSize={isLotWords ? FONT_SIZE * 0.55 : FONT_SIZE}
                fontHeight={isLotWords ? FONT_HEIGHT * 0.55 : FONT_HEIGHT}
                margin={2}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  container: {
    marginTop: "2.64vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  word: {
    display: "flex",
    flexDirection: "row",
    margin: 0,
  },
};
