"use client";
import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import {
  useGrade,
  useGradeById,
  useSession,
  useUnit,
  useUserInfo,
} from "@/customHooks/CustomHooks";
import { UnitType } from "@/types/types";
import UnitItem from "@/components/unitItem/UnitItem";
import Select from "@/components/select/Select";
import { useRouter } from "next/navigation";
import { Grid } from "@mui/material";
import Loading from "@/components/loading/Loading";

const HomePage = () => {
  const { sessionData } = useSession();
  const { userInfoData, isLoadingUserInfoData } = useUserInfo(
    sessionData?.user?.id
  );
  const [gradeId, setGradeId] = useState("");
  const { grades, isLoadingGrades } = useGrade();
  const { units } = useUnit(gradeId);

  const router = useRouter();
  const { grade } = useGradeById(gradeId);
  const [gradeTitle, setGradeTitle] = useState("");

  useEffect(() => {
    if (sessionData) {
      router.push("/");
    }
  }, [sessionData, router]);

  useEffect(() => {
    if (userInfoData?.gradeId) setGradeId(userInfoData?.gradeId);
  }, [userInfoData]);

  useEffect(() => {
    if (grade) {
      setGradeTitle(grade?.title);
    }
  }, [grade]);

  useEffect(() => {
    if (!userInfoData) {
      setGradeId("");
      setGradeTitle("");
    }
  }, [userInfoData]);

  if (isLoadingUserInfoData) return <Loading />;

  return (
    <div className={`${styles.container} ${!gradeId && styles.empty}`}>
      <div className={styles.wrapper}>
        <div className={styles.selectContainer}>
          <div>
            {gradeId === "" && (
              <h1>
                A place to learn English vocabulary
                <span>Hello there! Which grade are you in?</span>
              </h1>
            )}
          </div>
          <Select
            grades={grades}
            isLoadingGrades={isLoadingGrades}
            setGradeId={setGradeId}
            title={gradeTitle}
          />
        </div>
      </div>

      <Grid container spacing={2}>
        {gradeId !== "" &&
          units?.map((unit: UnitType) => (
            <Grid item xs={6} sm={4} md={3}>
              <UnitItem unit={unit} />
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default HomePage;
