import { GradeType } from "@/types/types";
import React from "react";

const GradeItem = ({ grade }: { grade: GradeType }) => {
  return <option value={grade._id}>{grade.title}</option>;
};

export default GradeItem;
