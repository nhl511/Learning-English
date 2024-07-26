"use client";
import React from "react";
import styles from "./learnerHompage.module.css";
import Select from "../select/Select";
import { Grid } from "@mui/material";
import { UnitType } from "@/types/types";
import UnitItem from "../unitItem/UnitItem";
import { useGrade, useUnit } from "@/customHooks/CustomHooks";
import Loading from "../loading/Loading";

const LearnerHompage = ({
  gradeId,
  setGradeId,
  gradeTitle,
}: {
  gradeId: string;
  setGradeId: any;
  gradeTitle: string;
}) => {
  const { grades, isLoadingGrades } = useGrade();
  const { units } = useUnit(gradeId);

  if (isLoadingGrades) return <Loading />;

  return (
    <div className={styles.container}>
      <div className={styles.selectContainer}>
        <Select
          grades={grades}
          isLoadingGrades={isLoadingGrades}
          setGradeId={setGradeId}
          title={gradeTitle}
        />
      </div>
      <Grid container spacing={2}>
        {gradeId !== "" &&
          units?.map((unit: UnitType) => (
            <Grid key={unit?._id} item xs={6} sm={4} md={3}>
              <UnitItem unit={unit} />
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default LearnerHompage;
