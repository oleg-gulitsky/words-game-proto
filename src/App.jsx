import { useState } from "react";

import { usePersistState } from "./state/index.jsx";

import { Level } from "./components/Level.jsx";
import { WinModal } from "./components/WinModal.jsx";

export function App() {
  const { levelCompleted } = usePersistState();
  const [isWinModalActive, setIsWinModalActive] = useState(false);

  const handleLevelCompleted = () => {
    setIsWinModalActive(true);
    levelCompleted();
  };

  const handleWinModalCloseClick = () => {
    setIsWinModalActive(false);
  };

  return (
    <div style={styles.container}>
      <Level onLevelCompleted={handleLevelCompleted} />
      {isWinModalActive && <WinModal onCloseClick={handleWinModalCloseClick} />}
      {/* <WinModal onCloseClick={handleWinModalCloseClick} /> */}
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
    width: "100vw",
    height: "100vh",
    // border: "1px solid red",
  },
};
