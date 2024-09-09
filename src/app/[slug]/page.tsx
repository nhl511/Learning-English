import React, { Suspense } from "react";
import styles from "./unitDetail.module.css";

import VocabularyForm from "@/components/vocabularyForm/VocabularyForm";
import { getUnitById } from "@/libs/data";
import LoadingUI from "@/components/loading/Loading";

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
    <Suspense key={params.id} fallback={<LoadingUI />}>
      <div className={styles.container}>
        <VocabularyForm slug={slug} />
      </div>
    </Suspense>
  );
};

export default UnitDetailPage;
