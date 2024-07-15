import { useState } from "react";

const radius = 15.85;
const itemSize = 7.92;

export function LettersInput(props) {
  const { letters, selectedLetterIndexes, onInput } = props;
  const numberOfItems = letters.length;

  const [cursorPosition, setCursorPosition] = useState(null);
  const [points, setPoints] = useState([]);

  const addPoint = (coords) => {
    setPoints((points) => [...points, coords]);
  };

  const addLetterIndex = (index) => {
    onInput((prev) => [...prev, index]);
  };

  const handleInputStart = (event) => {
    const element = getElement(event);
    const coords = getElementCoords(element);
    const index = getElementIndex(element);

    addPoint(coords);
    addLetterIndex(index);
  };

  const handleMove = (event) => {
    if (!selectedLetterIndexes.length) {
      return;
    }

    const cursorCoords = getCursorCoords(event);

    setCursorPosition(cursorCoords);

    const element = getElement(event);

    if (!element || !element.dataset.index) {
      return;
    }

    const coords = getElementCoords(element);
    const index = getElementIndex(element);

    if (index == selectedLetterIndexes[selectedLetterIndexes.length - 1]) {
      return;
    }

    if (
      selectedLetterIndexes.length > 1 &&
      index == selectedLetterIndexes[selectedLetterIndexes.length - 2]
    ) {
      setPoints((points) => points.slice(0, -1));
      onInput((prev) => prev.slice(0, -1));
      return;
    }

    if (selectedLetterIndexes.includes(index)) {
      return;
    }

    addPoint(coords);
    addLetterIndex(index);
  };

  const handleInputStop = () => {
    setCursorPosition(null);
    setPoints([]);
  };

  return (
    <>
      <div
        style={styles.container}
        onPointerMove={handleMove}
        onPointerUp={handleInputStop}
        onTouchEnd={handleInputStop}
      />
      <div
        style={styles.wrapper}
        onPointerMove={handleMove}
        onPointerUp={handleInputStop}
        onTouchEnd={handleInputStop}
      >
        <div style={styles.ring} />
        {letters.map((letter, index) => {
          const { x, y } = getCoordsByIndex(index, numberOfItems);
          const isSelected = selectedLetterIndexes.includes(index);
          return (
            <div
              key={index}
              data-index={index}
              onPointerDown={handleInputStart}
              style={{
                ...styles.letterContainer,
                left: `${x - itemSize / 2}vh`,
                top: `${y - itemSize / 2}vh`,
              }}
            >
              <div
                style={{
                  ...styles.letterContainerBg,
                  top: "3px",
                  backgroundColor: isSelected ? "#AF638C" : "#A6A8AB",
                }}
              />
              <div
                style={{
                  ...styles.letterContainerBg,
                  backgroundColor: isSelected ? "#E96FA4" : "white",
                }}
              />
              <div
                style={{
                  ...styles.letter,
                  color: isSelected ? "white" : "#58595B",
                }}
              >
                {letter}
              </div>
            </div>
          );
        })}
      </div>
      <svg style={styles.line}>
        {selectedLetterIndexes.length > 0 && cursorPosition && (
          <polyline
            points={
              points.map((p) => `${p.x},${p.y}`).join(" ") +
              ` ${cursorPosition.x},${cursorPosition.y}`
            }
            fill="none"
            stroke="#638EC4"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </>
  );
}

const styles = {
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  wrapper: {
    width: radius * 2 + "vh",
    height: radius * 2 + "vh",
    position: "relative",
    margin: 0,
    marginTop: "3.5vh",
    alignItems: "center",
  },
  line: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: 4,
  },
  letterContainer: {
    position: "absolute",
    width: itemSize + "vh",
    height: itemSize + "vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
  },
  letterContainerBg: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    position: "absolute",
    pointerEvents: "none",
  },
  letter: {
    pointerEvents: "none",
    zIndex: 3,
    fontSize: "5.02vh",
    height: "9.24vh",
    color: "#58595B",
  },
  ring: {
    position: "absolute",
    width: "22vh",
    height: "22vh",
    top: "50%",
    left: "50%",
    marginTop: "-13.2vh",
    marginLeft: "-13.2vh",
    borderWidth: "1.76vh",
    borderColor: "#3E4A68",
    borderRadius: "50%",
    borderStyle: "solid",
  },
};

const getCoordsByIndex = (index, numberOfItems) => {
  const angle = (index / numberOfItems) * (2 * Math.PI) - Math.PI / 2;
  const x = radius + (radius - itemSize / 2) * Math.cos(angle);
  const y = radius + (radius - itemSize / 2) * Math.sin(angle);

  return { x, y };
};

const getCursorCoords = (event) => {
  let x, y;

  if (event.touches) {
    const touch = event.touches[0];
    x = touch.clientX;
    y = touch.clientY;
  } else {
    x = event.clientX;
    y = event.clientY;
  }
  return { x, y };
};

const getElement = (event) => {
  const { x, y } = getCursorCoords(event);
  return document.elementFromPoint(x, y);
};

const getElementCoords = (element) => {
  var rect = element.getBoundingClientRect();

  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  return { x, y };
};

const getElementIndex = (element) => {
  return parseInt(element.dataset.index, 10);
};
