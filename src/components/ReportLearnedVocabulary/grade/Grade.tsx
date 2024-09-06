"use client";
import { useSession, useUnit } from "@/customHooks/CustomHooks";
import React, { useEffect, useState } from "react";
import Unit from "../unit/Unit";
import styles from "./grade.module.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// A separate function to fetch vocabulary count without using a hook
const fetchVocabularyCount = async (unitId: string) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
      `/api/get-number-of-vocabulary/${unitId}`
  );
  const data = await res.json();
  return data || 0; // Return the number or 0 as fallback
};
const learnedVocabularyFetcher = async ({
  userId,
  unitId,
  type,
}: {
  userId: string;
  unitId: string;
  type: string;
}) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
      `/api/get-learned-vocabulary?userId=${userId}&unitId=${unitId}&type=${type}`
  );
  const data = await res.json();
  return data.count || 0;
};

const Grade = ({ grade, type }: { grade: any; type: any }) => {
  const { units } = useUnit(grade?._id); // Hook to fetch units for the grade
  const [isOpen, setIsOpen] = useState(false);
  const [total, setTotal] = useState(0); // State to store the total vocabulary count
  const [learned, setLearned] = useState(0);
  const { sessionData } = useSession();

  useEffect(() => {
    const calculateTotalVocab = async () => {
      if (units && units.length > 0) {
        const vocabCounts = await Promise.all(
          units.map((unit: any) => fetchVocabularyCount(unit._id))
        );

        const totalVocab = vocabCounts.reduce((acc, count) => acc + count, 0);
        setTotal(totalVocab);
      }
    };
    const calculateTotalLearnedVocab = async () => {
      if (units && units.length > 0 && sessionData && type) {
        const vocabCounts = await Promise.all(
          units.map((unit: any) =>
            learnedVocabularyFetcher({
              userId: sessionData?.user?.id,
              unitId: unit._id,
              type,
            })
          )
        );
        const totalVocab = vocabCounts.reduce((acc, count) => acc + count, 0);
        setLearned(totalVocab);
      }
    };
    calculateTotalLearnedVocab();
    calculateTotalVocab();
  }, [units, sessionData, type]);

  return (
    <div className={styles.container} onClick={() => setIsOpen(!isOpen)}>
      <div className={styles.topWrapper}>
        <div className={styles.left}>
          {!isOpen ? <KeyboardArrowRightIcon /> : <KeyboardArrowDownIcon />}
          <h4>{grade?.title}</h4>
        </div>
        <div className={styles.number}>
          {learned}/{total} total
        </div>
      </div>
      {isOpen &&
        units?.map((unit: any) => (
          <Unit key={unit._id} unit={unit} type={type} />
        ))}
    </div>
  );
};

export default Grade;
