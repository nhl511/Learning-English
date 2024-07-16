import React from "react";
import styles from "./toggleButton.module.css";

const ToggleButton = ({
  isChoose,
  setChangeMode,
}: {
  isChoose: any;
  setChangeMode: any;
}) => {
  const handleChangeMode = (state: boolean) => {
    setChangeMode(state);
  };
  return (
    <div className={styles.container}>
      <button
        className={`${styles.changeMode} ${!isChoose && styles.selectMode}`}
        onClick={() => {
          handleChangeMode(false);
        }}
      >
        Off
      </button>
      <button
        className={`${styles.changeMode} ${isChoose && styles.selectMode}`}
        onClick={() => {
          handleChangeMode(true);
        }}
      >
        On
      </button>
    </div>
  );
};

export default ToggleButton;
