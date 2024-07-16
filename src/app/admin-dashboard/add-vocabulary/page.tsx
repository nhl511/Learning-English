import React from "react";
import styles from "./addVocabulary.module.css";
import AddVocabularyForm from "@/components/addVocabularyForm/AddVocabularyForm";
import VocabularyList from "@/components/vocabularyList/VocabularyList";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vocabularies management",
  description: "",
};

const AddVocabularyPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <Link href="/admin-dashboard/add-unit">
          <button>Add new unit</button>
        </Link>
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.wrapper}>
          <AddVocabularyForm />
        </div>
        <div className={styles.list}>
          <VocabularyList />
        </div>
      </div>
    </div>
  );
};

export default AddVocabularyPage;
