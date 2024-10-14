"use client";
import { useGrade, useUnit } from "@/customHooks/CustomHooks";
import { GradeType } from "@/types/types";
import React, { useRef, useState } from "react";
import styles from "./addUnitForm.module.css";
import { addUnit } from "@/libs/actions";

const AddUnitForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [gradeId, setGradeId] = useState("");
  const { grades } = useGrade();
  const { mutateUnits } = useUnit(gradeId);
  const descriptionRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className={styles.form}
      action={async (formData) => {
        setIsLoading(true);
        await addUnit(formData);
        mutateUnits();
        setIsLoading(false);
        if (descriptionRef.current) {
          descriptionRef.current.value = "";
        }
      }}
    >
      <select
        defaultValue=""
        name="gradeId"
        onChange={(e: any) => setGradeId(e.target.value)}
        disabled={isLoading}
      >
        <option value="" disabled>
          Select a grade
        </option>
        {grades?.map((grade: GradeType) => (
          <option key={grade._id} value={grade._id}>
            {grade.title}
          </option>
        ))}
      </select>
      <input
        placeholder="Nhập ghi chú"
        name="description"
        ref={descriptionRef}
      />
      <button disabled={isLoading}>Add new unit</button>
    </form>
  );
};

export default AddUnitForm;
