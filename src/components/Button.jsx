export function Button(props) {
  const { onClick, title, style } = props;

  return (
    <div style={{ ...styles.container, ...style }} onPointerDown={onClick}>
      <div style={{ ...styles.background, ...styles.backgroundShadow }} />
      <div style={styles.background} />
      <p style={styles.title}>{title}</p>
    </div>
  );
}

const styles = {
  container: {
    width: "29.4vh",
    height: "8.36vh",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderHorizontalRadius: "50%",
    backgroundColor: "#65BD65",
    borderTopLeftRadius: "14.52vh",
    borderBottomLeftRadius: "14.52vh",
    borderTopRightRadius: "14.52vh",
    borderBottomRightRadius: "14.52vh",
  },
  backgroundShadow: {
    top: "5px",
    backgroundColor: "#508853",
  },
  title: {
    position: "absolute",
    fontSize: "3.52vh",
    height: "6.16vh",
  },
};
