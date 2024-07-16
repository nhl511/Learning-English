import React from "react";
import styles from "./loading.module.css";

const Loading = () => {
  return (
    <div className={styles.container}>
      <span className={styles.loader}></span>
    </div>
  );
};

export default Loading;
