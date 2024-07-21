"use client";
import React, { useState } from "react";
import styles from "./gradeTable.module.css";
import { useGrade } from "@/customHooks/CustomHooks";
import { GradeType } from "@/types/types";
import Modal from "@/components/modal/Modal";
import { deleteGrade } from "@/libs/actions";

const GradeTable = () => {
  const { grades, mutateGrades } = useGrade();
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState("");

  const handleOpenModal = (id: string) => {
    setShowModal(true);
    setId(id);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <table className={styles.table}>
        <thead className={styles.head}>
          <tr className={styles.row}>
            <th>Grade</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className={styles.body}>
          {grades?.map((grade: GradeType) => (
            <tr key={grade._id} className={styles.row}>
              <td>{grade.title}</td>

              <td>
                <button
                  className={styles.dangerButtonTable}
                  onClick={() => handleOpenModal(grade._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={showModal} onClose={handleCloseModal}>
        <h2>Confirm</h2>
        <p>Are you sure to delete this unit?</p>
        <div className={styles.buttonWrapper}>
          <button
            className={styles.dangerButton}
            onClick={async () => {
              await deleteGrade(id);
              handleCloseModal();
              mutateGrades();
            }}
          >
            Yes
          </button>

          <button className={styles.button} onClick={handleCloseModal}>
            No
          </button>
        </div>
      </Modal>
    </>
  );
};

export default GradeTable;
