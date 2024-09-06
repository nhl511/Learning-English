"use client";
import { useGrade } from "@/customHooks/CustomHooks";
import React, { useState } from "react";
import Grade from "./grade/Grade";
import styles from "./reportLearnedVacabulary.module.css";
import KeyboardAltOutlinedIcon from "@mui/icons-material/KeyboardAltOutlined";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";

const ReportLearnedVocabulary = () => {
  const { grades } = useGrade();
  const [type, setType] = useState("writing");

  return (
    <div className={styles.container}>
      <div className={styles.optionWrapper}>
        <div
          className={`${type === "writing" && styles.active} ${styles.option}`}
        >
          <KeyboardAltOutlinedIcon />
          <p onClick={() => setType("writing")}>Typing</p>
        </div>
        <div
          className={`${type === "speaking" && styles.active} ${styles.option}`}
        >
          {" "}
          <MicNoneOutlinedIcon />
          <p onClick={() => setType("speaking")}>Speaking</p>
        </div>
      </div>
      {grades?.map((grade: any) => (
        <Grade key="" grade={grade} type={type} />
      ))}
    </div>
  );
};

export default ReportLearnedVocabulary;
