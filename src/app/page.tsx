"use client";
import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import {
  useGradeById,
  useSession,
  useUserInfo,
} from "@/customHooks/CustomHooks";

import { useRouter } from "next/navigation";
import Loading from "@/components/loading/Loading";
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
    if (userInfoData?.gradeId) {
      setGradeId(userInfoData?.gradeId);
    }
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

  return (
    <div className={styles.container}>
      {gradeId === "" ? (
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
