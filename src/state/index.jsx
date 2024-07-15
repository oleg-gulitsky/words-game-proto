import { createContext, useState, useEffect, useContext } from "react";
import { ErrorModal } from "../components/ErrorModal";

const PersistStateContext = createContext();

const SAVED_LEVEL = "SAVED_LEVEL";
const STATE_TIMESTAMP = "STATE_TIMESTAMP";
const OPEN_WORD_INDEXES = "OPEN_WORD_INDEXES";

const getSavedOpenWordIndexes = () =>
  localStorage
    .getItem(OPEN_WORD_INDEXES)
    ?.split(",")
    .map((el) => +el) || [];

const getSavedLevel = () => +localStorage.getItem(SAVED_LEVEL) || 1;

const savedLevel = getSavedLevel();
const savedOpenWordIndexes = getSavedOpenWordIndexes();

let currentTabStateTimestamp =
  localStorage.getItem(STATE_TIMESTAMP) || Date.now();

function checkIsStateRelevance() {
  const stateTimestamp = localStorage.getItem(STATE_TIMESTAMP);

  return stateTimestamp && currentTabStateTimestamp
    ? currentTabStateTimestamp == stateTimestamp
    : true;
}

function updateStateTimestamp() {
  currentTabStateTimestamp = Date.now();
  localStorage.setItem(STATE_TIMESTAMP, currentTabStateTimestamp);
}

function actualizeStateTimestamp() {
  currentTabStateTimestamp = localStorage.getItem(STATE_TIMESTAMP);
}

export function PersistStateProvider({ children }) {
  const [isErrorModalActive, setIsErrorModalActive] = useState(false);
  const [openWordIndexes, setOpenWordIndexes] = useState(savedOpenWordIndexes);
  const [currentLevel, setCurrentLevel] = useState(savedLevel);

  const checkState = () => {
    if (!checkIsStateRelevance()) {
      setIsErrorModalActive(true);

      const level = getSavedLevel();
      setCurrentLevel(level);

      const savedOpenWordIndexes = getSavedOpenWordIndexes();
      setOpenWordIndexes(savedOpenWordIndexes);

      actualizeStateTimestamp();
    }
  };

  useEffect(() => {
    checkState();

    window.addEventListener("visibilitychange", checkState);

    return () => {
      window.removeEventListener("visibilitychange", checkState);
    };
  }, []);

  const handleErrorModalCloseClick = () => {
    setIsErrorModalActive(false);
  };

  const levelCompleted = () => {
    localStorage.setItem(SAVED_LEVEL, currentLevel + 1);
    localStorage.removeItem(OPEN_WORD_INDEXES);
    setOpenWordIndexes([]);

    updateStateTimestamp();
    setCurrentLevel((prev) => ++prev);
  };

  const addOpenWordIndex = (index) => {
    setOpenWordIndexes((prevValue) => {
      const newOpenWordIndexes = [...prevValue, index];

      localStorage.setItem(OPEN_WORD_INDEXES, newOpenWordIndexes.toString());
      updateStateTimestamp();
      return newOpenWordIndexes;
    });
  };

  const persistState = {
    openWordIndexes,
    addOpenWordIndex,
    currentLevel,
    levelCompleted,
  };

  return (
    <PersistStateContext.Provider value={persistState}>
      {children}
      {isErrorModalActive && (
        <ErrorModal onCloseClick={handleErrorModalCloseClick} />
      )}
    </PersistStateContext.Provider>
  );
}

export const usePersistState = () => useContext(PersistStateContext);
