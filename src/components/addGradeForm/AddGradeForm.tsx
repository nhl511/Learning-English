"use client";
import React, { useState } from "react";
import styles from "./addGradeForm.module.css";
import { addGrade } from "@/libs/actions";
import { useGrade } from "@/customHooks/CustomHooks";

const AddGradeForm = () => {
  const [isloading, setIsLoading] = useState(false);
  const [grade, setGrade] = useState("");
  const [curriculum, setCurriculum] = useState("");
  const { mutateGrades } = useGrade();
  return (
    <form
      className={styles.form}
      action={async (formData) => {
        setIsLoading(true);
        await addGrade(formData);
        mutateGrades();
        setIsLoading(false);
        setGrade("");
        setCurriculum("");
      }}
    >
      <input
        placeholder="Enter Grade"
        type="text"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
      />
      <input
        placeholder="Enter Curriculum"
        type="text"
        value={curriculum}
        onChange={(e) => setCurriculum(e.target.value)}
      />
      <input
        className={styles.disabled}
        name="title"
        type="text"
        value={grade + " - " + curriculum}
        readOnly
      />
      <button>Add new grade</button>
    </form>
  );
};

export default AddGradeForm;
