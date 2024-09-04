"use client";
import React from "react";
import styles from "./unitItem.module.css";
import { UnitType } from "@/types/types";
import { useNumberOfVocabulary } from "@/customHooks/CustomHooks";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const UnitItem = ({ unit }: { unit: UnitType }) => {
  const { number } = useNumberOfVocabulary(unit._id);
  const router = useRouter();
  const handleClick = () => {
    if (number > 0) {
      router.push(`/menu-list/${unit._id}`);
    } else {
      toast.info("Comming soon!");
    }
  };
  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.wrapper}>
        <h2>{unit.title}</h2>
      </div>
      <div className={styles.vocabNumber}>
        <p>{number > 0 ? `${number} vocabularies` : `Comming soon`}</p>
      </div>
    </div>
  );
};

export default UnitItem;
