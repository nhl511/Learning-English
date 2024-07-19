import React from "react";
import styles from "./addGrade.module.css";
import { Metadata } from "next";
import AddGradeForm from "@/components/addGradeForm/AddGradeForm";
import GradeList from "@/components/gradeList/GradeList";

export const metadata: Metadata = {
  title: "Grades management",
  description: "",
};

const AddGradePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <AddGradeForm />
      </div>
      <div className={styles.list}>
        <GradeList />
      </div>
    </div>
  );
};

export default AddGradePage;
