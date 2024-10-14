import React from "react";
import styles from "./vocabularies.module.css";
import SavedVocabularyForm from "@/components/savedVocabularyForm/SavedVocabularyForm";

const SavedVocabulariesDetailPage = () => {
  return (
    <div className={styles.container}>
      <SavedVocabularyForm />
    </div>
  );
};

export default SavedVocabulariesDetailPage;
