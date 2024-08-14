"use client";
import React, { useEffect, useState } from "react";
import styles from "./savedVocabularies.module.css";
import Vocabulary from "@/components/vocabulary/Vocabulary";
import {
  useHardVocabularies,
  useNumberOfHardVocabulary,
} from "@/customHooks/CustomHooks";
import Modal from "@/components/modal/Modal";
import ToggleButton from "@/components/ToggleButton/ToggleButton";
import { useRouter } from "next/navigation";
const SavedVocabularyPage = ({ params }: any) => {
  const { slug } = params;
  const [page, setPage] = useState(0);
  const { number } = useNumberOfHardVocabulary(slug);
  const [showModal, setShowModal] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [isStar, setIsStar] = useState(true);
  const router = useRouter();
  const [isViSound, setIsViSound] = useState(false);

  const { hardVocabularyData, isLoadingHardVocabulary } = useHardVocabularies({
    page,
    userId: slug,
  });

  const options = [
    {
      title: "Mode",
      control: (
        <ToggleButton
          isChoose={isReviewing}
          setChangeMode={setIsReviewing}
          options={{ inActive: "Study", active: "Review" }}
        />
      ),
    },
    {
      title: "Filter",
      control: (
        <ToggleButton
          isChoose={isStar}
          setChangeMode={setIsStar}
          options={{ inActive: "All", active: "Bookmarks" }}
        />
      ),
    },
    {
      title: "Sound",
      control: (
        <ToggleButton
          isChoose={isViSound}
          setChangeMode={setIsViSound}
          options={{ inActive: "En", active: "Vi" }}
        />
      ),
    },
  ];

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (!isStar) router.back();
  }, [isStar]);

  return (
    <>
      <div className={styles.container}>
        <Vocabulary
          data={hardVocabularyData}
          isLoading={isLoadingHardVocabulary}
          page={page}
          setPage={setPage}
          number={number}
          handleOpenModal={handleOpenModal}
          isReviewing={isReviewing}
          isViSound={isViSound}
          setIsViSound={setIsViSound}
        />
      </div>
      <Modal show={showModal} onClose={handleCloseModal}>
        <h2>Options</h2>
        <div className={styles.rowWrapper}>
          {options.map((option) => (
            <div key={option.title} className={styles.rowItem}>
              <div>
                <h4>{option.title}</h4>
              </div>
              <div>{option.control}</div>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default SavedVocabularyPage;
