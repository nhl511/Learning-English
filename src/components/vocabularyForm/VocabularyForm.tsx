"use client";
import React, { useEffect, useState } from "react";
import styles from "./vocabularyForm.module.css";
import {
  useGradeById,
  useNumberOfVocabulary,
  useSession,
  useUnitById,
} from "@/customHooks/CustomHooks";
import { useRouter } from "next/navigation";
import ToggleButton from "../ToggleButton/ToggleButton";
import Vocabulary from "../vocabulary/Vocabulary";
import Modal from "../modal/Modal";
import useSWR from "swr";
import Loading from "../loading/Loading";

const VocabularyForm = ({ slug }: { slug: string }) => {
  const { sessionData } = useSession();
  const router = useRouter();
  const [page, setPage] = useState(0);
  const { number } = useNumberOfVocabulary(slug);
  const { unit } = useUnitById(slug);
  const { grade } = useGradeById(unit?.gradeId);
  const [showModal, setShowModal] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [isStar, setIsStar] = useState(false);
  const [isViSound, setIsViSound] = useState(false);

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
    if (isStar) router.push(`/saved-vocabularies/${sessionData?.user.id}`);
  }, [isStar]);

  if (!slug || !number || !unit || !grade) return <Loading />;

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
