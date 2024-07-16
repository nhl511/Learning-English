"use client";
import { GradeType, UnitType } from "@/types/types";
import React, { useState } from "react";
import { useGrade, useUnit } from "@/customHooks/CustomHooks";
import VocabularyTable from "./vocabularyTable/VocabularyTable";

const VocabularyList = () => {
  const [gradeId, setGradeId] = useState("");
  const [unitId, setUnitId] = useState("");
  const { grades } = useGrade();
  const { units } = useUnit(gradeId);

  return (
    <div>
      <form action="">
        <select
          onChange={(e: any) => {
            setGradeId(e.target.value);
            setUnitId("");
          }}
          defaultValue=""
          value={gradeId}
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
        <select
          name="unitId"
          onChange={(e: any) => setUnitId(e.target.value)}
          defaultValue=""
          value={unitId}
        >
          <option value="" disabled>
            Select a unit
          </option>
          {units?.map((unit: UnitType) => (
            <option key={unit._id} value={unit._id}>
              {unit.title}
            </option>
          ))}
        </select>
      </form>
      <VocabularyTable unitId={unitId} />
    </div>
  );
};

export default VocabularyList;
