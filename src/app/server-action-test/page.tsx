"use client";
import { addUnit } from "@/libs/actions";
import { GradeType } from "@/types/types";
import React, { useEffect, useState } from "react";

const Test = () => {
  const [grades, setGrades] = useState<GradeType[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/grades");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await res.json();
        setGrades(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <form action={addUnit}>
        <input type="text" name="unit" />
        <select
          // onChange={(e: any) => setGradeId(e.target.value)}
          defaultValue=""
          name="gradeId"
        >
          <option value="" disabled>
            Select a grade
          </option>
          {grades.map((grade) => (
            <option key={grade._id} value={grade._id}>
              {grade.title}
            </option>
          ))}
        </select>

        <button>Add</button>
      </form>
    </div>
  );
};

export default Test;
