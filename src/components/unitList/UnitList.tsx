"use client";
import { useGrade } from "@/customHooks/CustomHooks";
import { GradeType } from "@/types/types";
import React, { useState } from "react";
import UnitTable from "./unitTable/UnitTable";

const UnitList = () => {
  const { grades } = useGrade();
  const [gradeId, setGradeId] = useState("");

  return (
    <div>
      <form action="">
        <select
          onChange={(e: any) => {
            setGradeId(e.target.value);
          }}
          defaultValue=""
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
      </form>
      <UnitTable gradeId={gradeId} />
    </div>
  );
};

export default UnitList;
