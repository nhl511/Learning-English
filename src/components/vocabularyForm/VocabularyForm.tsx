"use client";
import React, { useEffect, useState } from "react";
import styles from "./vocabularyForm.module.css";
import {
  useGradeById,
  useNumberOfVocabulary,
  useSession,
  useUnitById,
  useUserInfo,
} from "@/customHooks/CustomHooks";
import { useRouter, useSearchParams } from "next/navigation";

import ToggleButton from "../ToggleButton/ToggleButton";
import Vocabulary from "../vocabulary/Vocabulary";
import Modal from "../modal/Modal";
import useSWR from "swr";
import LoadingUI from "../loading/Loading";

const VocabularyForm = ({ slug }: { slug: string }) => {
  const { sessionData } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const input = searchParams.get("input");

  const [page, setPage] = useState(0);
  const { number } = useNumberOfVocabulary(slug);
  const { unit } = useUnitById(slug);
  const { grade } = useGradeById(unit?.gradeId);
  const [showModal, setShowModal] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [isStar, setIsStar] = useState(false);
  const [isViSound, setIsViSound] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [isTest, setIsTest] = useState(false);
  const { userInfoData } = useUserInfo(sessionData?.user?.id);

  const options = [
    // {
    //   title: "Filter",
    //   control: (
    //     <ToggleButton
    //       isChoose={isStar}
    //       setChangeMode={setIsStar}
    //       options={{ inActive: "All", active: "Bookmarks" }}
    //     />
    //   ),
    // },
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
  const fetcher = async (unitId: string) => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
        `/api/get-vocabularies-by-page?unitId=${unitId}&page=${page}`
    );
    const data = await res.json();
    return data;
  };
  const { data, isLoading } = useSWR(
    `api/get-vocabularies-by-page?unitId=${slug}&page=${page}`,
    () => fetcher(slug)
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
    if (isStar) router.push(`/saved-vocabularies/${sessionData?.user.id}`);
  }, [isStar]);

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
  if ((!data && page === 0) || !unit || !grade || number === undefined) {
    return <LoadingUI />;
  }

  return (
    <div className={styles.container}>
      <Vocabulary
        data={data}
        isLoading={isLoading}
        page={page}
        setPage={setPage}
        number={number}
        unit={unit}
        gradeTitle={grade?.title}
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

export default VocabularyForm;
