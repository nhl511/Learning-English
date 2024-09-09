import React from "react";
import styles from "./loading.module.css";

const LoadingUI = () => {
  return (
    <div className={styles.container}>
      <span className={styles.loader}></span>
    </div>
  );
};

export default LoadingUI;
