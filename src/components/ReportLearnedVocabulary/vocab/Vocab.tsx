import React from "react";
import styles from "./vocab.module.css";

const Vocab = ({ vocab, type }: { vocab: any; type: any }) => {
  return (
    <div
      className={`${vocab?.correctTime && styles.active} ${styles.container}`}
    >
      <p className={styles.title}>{vocab?.word}</p>
      {vocab?.correctTime &&
        (type === "writing" ? (
          <p className={styles.correctTime}>
            Typing times: {vocab?.correctTime?.writingTimes}
          </p>
        ) : (
          <p className={styles.correctTime}>
            Speaking times: {vocab?.correctTime?.speakingTimes}
          </p>
        ))}
    </div>
  );
};

export default Vocab;
