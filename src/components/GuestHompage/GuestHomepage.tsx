"use client";
import React from "react";
import styles from "./guestHomepage.module.css";
import Select from "../select/Select";
import { useGrade } from "@/customHooks/CustomHooks";
import Image from "next/image";

const GuestHomepage = ({ setGradeId }: { setGradeId: any }) => {
  const { grades, isLoadingGrades } = useGrade();

  return (
    <div className={styles.container}>
      {/* <div className={styles.imageContainer}>
        <Image src="/background.jpg" alt="" fill />
      </div> */}
      <div className={styles.selectContainer}>
        <div>
          <h1>
            A place to learn English vocabulary
            <span>Hello there! Which grade are you in?</span>
          </h1>
        </div>
        <Select
          grades={grades}
          isLoadingGrades={isLoadingGrades}
          setGradeId={setGradeId}
        />
      </div>
    </div>
  );
};

export default GuestHomepage;
