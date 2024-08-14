import React from "react";
import styles from "./toggleButton.module.css";

const ToggleButton = ({
  isChoose,
  setChangeMode,
  options,
}: {
  isChoose: any;
  setChangeMode: any;
  options: {
    inActive: String;
    active: String;
  };
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
        {options.inActive}
      </button>
      <button
        className={`${styles.changeMode} ${isChoose && styles.selectMode}`}
        onClick={() => {
          handleChangeMode(true);
        }}
      >
        {options.active}
      </button>
    </div>
  );
};

export default ToggleButton;
