"use client";
import React, { useState } from "react";
import styles from "./vocabularyManagement.module.css";
import AddVocabularyForm from "@/components/addVocabularyForm/AddVocabularyForm";
import VocabularyList from "@/components/vocabularyList/VocabularyList";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Modal from "@/components/modal/Modal";
import UploadExcel from "@/components/uploadExcel/UploadExcel";

const VocabularyManagement = () => {
  const [show, setShow] = useState(false);

  const handleOpenModal = () => {
    setShow(true);
  };

  const handleCloseModal = () => {
    setShow(false);
  };
  return (
    <>
      <div className={styles.container}>
        <div>
          <div className={styles.uploadContainer} onClick={handleOpenModal}>
            <UploadFileIcon />
            Import .xlsx file
          </div>
          <div className={styles.wrapper}>
            <AddVocabularyForm />
          </div>
        </div>

        <div className={styles.list}>
          <VocabularyList />
        </div>
      </div>
      <Modal show={show} onClose={handleCloseModal}>
        <h2>Import .xlsx file</h2>
        <UploadExcel onClose={handleCloseModal} />
      </Modal>
    </>
  );
};

export default VocabularyManagement;
