"use client";
import React, { useState } from "react";
import styles from "./vocabularyTable.module.css";
import { VocabularyType } from "@/types/types";
import { deleteVocabulary } from "@/libs/actions";
import Modal from "@/components/modal/Modal";
import { useVocabulary } from "@/customHooks/CustomHooks";
import UpdateVocabularyForm from "./updateVocabularyForm/UpdateVocabularyForm";
import AudioPlayer from "@/components/audioPlayer/AudioPlayer";
const VocabularyTable = ({ unitId }: { unitId: string }) => {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const [id, setId] = useState("");
  const {
    vocabularies,
    isLoadingVocabularies,
    isErrorVocabularies,
    nutateVocabularies,
  } = useVocabulary(unitId);
  const handleOpenModal = (id: string) => {
    setShowModal(true);
    setId(id);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal2 = (id: string) => {
    setShowModal2(true);
    setId(id);
  };

  const handleCloseModal2 = () => {
    setShowModal2(false);
  };

  if (isErrorVocabularies) return <div>failed to load</div>;
  if (isLoadingVocabularies) return <div>loading...</div>;

  return (
    <>
      <table className={styles.table}>
        <thead className={styles.head}>
          <tr className={styles.row}>
            <th>Word</th>
            <th>Definition</th>
            <th>Transcription</th>
            <th>Word type</th>
            <th>Audio</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className={styles.body}>
          {vocabularies?.map((vocabulary: VocabularyType) => (
            <tr key={vocabulary._id} className={styles.row}>
              <td>{vocabulary.word}</td>
              <td>{vocabulary.definition}</td>
              <td>{vocabulary.transcription}</td>
              <td>{vocabulary.wordType}</td>
              <td>
                {vocabulary?.audioLink && (
                  <AudioPlayer link={vocabulary.audioLink} autoPlay={false} />
                )}
              </td>
              <td>
                <div className={styles.buttonTableWrapper}>
                  <button
                    className={styles.buttonTable}
                    onClick={() => handleOpenModal2(vocabulary._id)}
                  >
                    Update
                  </button>
                  <button
                    className={styles.dangerButtonTable}
                    onClick={() => handleOpenModal(vocabulary._id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={showModal} onClose={handleCloseModal}>
        <h2>Confirm</h2>
        <p>Are you sure to delete this vocabulary?</p>
        <div className={styles.buttonWrapper}>
          <button
            className={styles.dangerButton}
            onClick={async () => {
              await deleteVocabulary(id);
              handleCloseModal();
              nutateVocabularies();
            }}
          >
            Yes
          </button>

          <button className={styles.button} onClick={handleCloseModal}>
            No
          </button>
        </div>
      </Modal>
      <Modal show={showModal2} onClose={handleCloseModal2}>
        <h2>Update vocabulary</h2>
        <UpdateVocabularyForm
          vocabularyId={id}
          unitId={unitId}
          onClose={handleCloseModal2}
        />
      </Modal>
    </>
  );
};

export default VocabularyTable;
