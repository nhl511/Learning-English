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
import Image from "next/image";
import GuestHomepage from "@/components/GuestHompage/GuestHomepage";
import LearnerHompage from "@/components/LearnerHompage/LearnerHompage";

const HomePage = () => {
  const { sessionData } = useSession();
  const { userInfoData, isLoadingUserInfoData } = useUserInfo(
    sessionData?.user?.id
  );
  const [gradeId, setGradeId] = useState("");

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
    <div className={styles.container}>
      {!gradeId ? (
        <GuestHomepage setGradeId={setGradeId} />
      ) : (
        <LearnerHompage
          gradeId={gradeId}
          setGradeId={setGradeId}
          gradeTitle={gradeTitle}
        />
      )}
    </div>
  );
};

export default HomePage;
