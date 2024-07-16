import React from "react";
import styles from "./unitDetail.module.css";

import VocabularyForm from "@/components/vocabularyForm/VocabularyForm";
import { getUnitById } from "@/libs/data";

export const generateMetadata = async ({ params }: any) => {
  const { slug } = params;
  if (slug !== "favicon.ico") {
    const { unit, grade } = await getUnitById(slug);
    return {
      title: `${grade.title} - ${unit.title}`,
      desc: "",
    };
  }
};

const UnitDetailPage = ({ params }: any) => {
  const { slug } = params;

  return (
    <div className={styles.container}>
      <VocabularyForm slug={slug} />
    </div>
  );
};

export default UnitDetailPage;
