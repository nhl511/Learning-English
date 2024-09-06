"use client";
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./unit.module.css";
import {
  useLearnedVocab,
  useNumberOfVocabulary,
  useSession,
} from "@/customHooks/CustomHooks";
import Vocab from "../vocab/Vocab";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
const Unit = ({ unit, type }: { unit: any; type: any }) => {
  const { sessionData } = useSession();
  const { learnedVocabularyData } = useLearnedVocab({
    userId: sessionData?.user?.id,
    unitId: unit?._id,
    type: type,
  });
  const [isOpen, setIsOpen] = useState(false);
  const { number } = useNumberOfVocabulary(unit?._id);

  return (
    <div
      className={styles.container}
      onClick={(e) => {
        setIsOpen(!isOpen);
        e.stopPropagation();
      }}
    >
      <div className={styles.topWrapper}>
        <div className={styles.leftWrapper}>
          {!isOpen ? <KeyboardArrowRightIcon /> : <KeyboardArrowDownIcon />}
          {unit?.title}
        </div>

        <div className={styles.number}>
          {learnedVocabularyData?.count}/{number} total
        </div>
      </div>
      <hr />
      {isOpen && (
        <Grid container spacing={1} sx={{ padding: "20px" }}>
          {learnedVocabularyData?.data?.map((item: any) => (
            <Grid item xs={6} sm={3} md={2} xl={1} key="">
              <Vocab vocab={item} type={type} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Unit;
