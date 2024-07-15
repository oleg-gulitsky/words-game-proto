import { usePersistState } from "../state/index.jsx";
import { Button } from "./Button.jsx";

export function WinModal(props) {
  const { currentLevel } = usePersistState();
  const { onCloseClick } = props;

  return (
    <div style={styles.container}>
      <p style={styles.title}>Уровень {currentLevel - 1} пройден</p>
      <p style={styles.subtitle}>Изумительно!</p>
      <Button
        onClick={onCloseClick}
        title={`Уровень ${currentLevel}`}
        style={styles.button}
      />
    </div>
  );
}

const styles = {
  container: {
    zIndex: 10,
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#2B344B",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: "3.26vh",
    margin: 0,
    marginTop: "26.41vh",
    color: "white",
  },
  subtitle: {
    fontSize: "4.67vh",
    margin: 0,
    lineHeight: "5.28vh",
    color: "white",
  },
  button: {
    marginTop: "22.01vh",
  },
};
