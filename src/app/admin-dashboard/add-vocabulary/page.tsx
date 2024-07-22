import React from "react";
import { Metadata } from "next";
import VocabularyManagement from "./vocabularyManagement/VocabularyManagement";

export const metadata: Metadata = {
  title: "Vocabularies management",
  description: "",
};

const AddVocabularyPage = () => {
  return <VocabularyManagement />;
};

export default AddVocabularyPage;
