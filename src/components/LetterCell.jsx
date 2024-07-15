export function LetterCell(props) {
  const { letter, isOpen, cellSize, fontSize, fontHeight, margin } = props;

  return (
    <div
      style={{
        ...styles.container,
        width: cellSize + "vh",
        height: cellSize + "vh",
        margin: margin + "px",
        backgroundColor: isOpen ? "#65BD65" : "white",
      }}
    >
      {letter && (
        <p
          style={{
            ...styles.letter,
            color: isOpen ? "white" : "#4D4D4D",
            fontSize: fontSize + "vh",
            height: fontHeight + "vh",
          }}
        >
          {letter}
        </p>
      )}
    </div>
  );
}

const styles = {
  container: {
    borderRadius: "30%",
    backgroundColor: "white",
    margin: "3px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  letter: {
    margin: 0,
    verticalAlign: "middle",
    color: "white",
  },
};
