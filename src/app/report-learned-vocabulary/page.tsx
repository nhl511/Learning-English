import { Metadata } from "next";
import React from "react";
import styles from "./reportLearnedVocabulary.module.css";
import ReportLearnedVocabulary from "@/components/ReportLearnedVocabulary/ReportLearnedVocabulary";

export const metadata: Metadata = {
  title: "Report learned vocabulary",
  description: "",
};
const ReportLearnedVocabularyPage = () => {
  return (
    <div className={styles.container}>
      <ReportLearnedVocabulary />
    </div>
  );
};

export default ReportLearnedVocabularyPage;
