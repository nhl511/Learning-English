import { useGrade, useUnit, useUnitById } from "@/customHooks/CustomHooks";
import { GradeType, UnitType } from "@/types/types";
import React, { useEffect, useState } from "react";

const UpdateUnit = ({
  unitId,
  isLoading,
}: {
  unitId: string;
  isLoading: boolean;
}) => {
  const [unitIdState, setUnitIdState] = useState("");
  const [gradeIdState, setGradeIdState] = useState("");
  const { unit } = useUnitById(unitId);
  const { grades } = useGrade();
  const { units } = useUnit(gradeIdState);

  useEffect(() => {
    setUnitIdState(unit?._id);
    setGradeIdState(unit?.gradeId);
  }, [unitId, unit?._id, unit?.gradeId]);

  return (
    <>
      <select
        value={gradeIdState}
        onChange={(e) => {
          setGradeIdState(e.target.value);
          setUnitIdState("");
        }}
        name="gradeId"
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
      <select
        value={unitIdState}
        onChange={(e) => setUnitIdState(e.target.value)}
        name="unitId"
        disabled={isLoading}
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
    </>
  );
};

export default UpdateUnit;
