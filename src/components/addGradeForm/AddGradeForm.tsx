"use client";
import React, { useState } from "react";
import styles from "./addGradeForm.module.css";
import { addGrade } from "@/libs/actions";

const AddGradeForm = () => {
  const [isloading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  return (
    <form
      className={styles.form}
      action={async (formData) => {
        setIsLoading(true);
        await addGrade(formData);
        // mutateUnits();
        setIsLoading(false);
        setTitle("");
      }}
    >
      <input
        name="title"
        placeholder="Enter title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button>Add new grade</button>
    </form>
  );
};

export default AddGradeForm;
