import { Button } from "./Button.jsx";
import bgImage from "../assets/ribbon.png";

export function ErrorModal(props) {
  const { onCloseClick } = props;

  return (
    <div style={styles.container}>
      <div style={styles.background} />
      <div style={styles.modal}>
        <div style={styles.header}>Две вкладки с игрой?</div>
        <p style={styles.text}>
          Похоже, игра открыта в нескольких вкладках браузера.
        </p>
        <p style={styles.text}>
          Чтобы продолжить играть в этой вкладке, обновите страницу.
        </p>
        <Button onClick={onCloseClick} title="Обновить" style={styles.button} />
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 11,
  },
  background: {
    zIndex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "black",
    opacity: 0.7,
  },
  modal: {
    zIndex: 2,
    width: "43.65vh",
    height: "39.61vh",
    backgroundColor: "white",
    borderRadius: "2.64vh",
    marginTop: "32.13vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    width: "33.8vh",
    height: "9.95vh",
    marginTop: "-1.67vh",
    marginBottom: "0.88vh",
    backgroundImage: `url(${bgImage})`,
    backgroundRepeat: "round",
    fontSize: "3.52vh",
    textAlign: "center",
    lineHeight: "3.52vh",
  },
  text: {
    color: "#4D4D4D",
    fontSize: "2.82vh",
    marginInline: "3.52vh",
    textAlign: "center",
    lineHeight: "3.08vh",
  },
  button: {
    marginTop: "1.76vh",
  },
};
