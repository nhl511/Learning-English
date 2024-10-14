"use client";
import React, { useEffect, useState } from "react";
import styles from "./savedVocabularyForm.module.css";
import {
  useNumberOfHardVocabulary,
  useSession,
  useUserInfo,
} from "@/customHooks/CustomHooks";
import { useRouter, useSearchParams } from "next/navigation";
import ToggleButton from "../ToggleButton/ToggleButton";
import useSWR from "swr";
import LoadingUI from "../loading/Loading";
import Vocabulary from "../vocabulary/Vocabulary";
import Modal from "../modal/Modal";

const SavedVocabularyForm = () => {
  const { sessionData } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const input = searchParams.get("input");

  const [page, setPage] = useState(0);
  const { number } = useNumberOfHardVocabulary(sessionData?.user?.id);
  const [showModal, setShowModal] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [isViSound, setIsViSound] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [isTest, setIsTest] = useState(false);
  const { userInfoData } = useUserInfo(sessionData?.user?.id);

  const options = [
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
  const fetcher = async (userId: string) => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
        `/api/hard-vocabularies?userId=${userId}&page=${page}`
    );
    const data = await res.json();
    return data;
  };
  const { data, isLoading } = useSWR(
    `api/hard-vocabularies?userId=${sessionData?.user?.id}&page=${page}`,
    () => fetcher(sessionData?.user?.id)
  );

  useEffect(() => {
    if (
      userInfoData?.isActive === false &&
      (mode === "practice" || mode === "test")
    ) {
      router.back();
    }
  }, [userInfoData, mode]);

  useEffect(() => {
    if (mode === "study" && input === "speaking") {
      setIsReading(true);
    } else if (mode === "practice" && input === "typing") {
      setIsReviewing(true);
    } else if (mode === "practice" && input === "speaking") {
      setIsReviewing(true);
      setIsReading(true);
    } else if (mode === "test" && input === "typing") {
      setIsTest(true);
      setIsReviewing(true);
    } else if (mode === "test" && input === "speaking") {
      setIsTest(true);
      setIsReviewing(true);
      setIsReading(true);
    }
  }, [mode, input]);
  if ((!data && page === 0) || number === undefined) {
    return <LoadingUI />;
  }

  return (
    <div className={styles.container}>
      <Vocabulary
        data={data?.vocabulary}
        isLoading={isLoading}
        page={page}
        setPage={setPage}
        number={number}
        handleOpenModal={handleOpenModal}
        isReviewing={isReviewing}
        isViSound={isViSound}
        setIsViSound={setIsViSound}
        isReading={isReading}
        isTest={isTest}
      />

      <Modal show={showModal} onClose={handleCloseModal}>
        <h2 className={styles.modalTitle}>Options</h2>
        <div className={styles.rowWrapper}>
          {options.map((option) => (
            <div key={option.title} className={styles.rowItem}>
              <div className={styles.titleWrapper}>
                <h4>{option.title}</h4>
              </div>
              <div className={styles.controlWrapper}>{option.control}</div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default SavedVocabularyForm;
