"use client";
import React, { useState } from "react";
import styles from "./gradeTable.module.css";
import { useGrade } from "@/customHooks/CustomHooks";
import { GradeType } from "@/types/types";
import Modal from "@/components/modal/Modal";
import { deleteGrade } from "@/libs/actions";
import UpdateGradeForm from "./updateGradeForm/UpdateGradeForm";

const GradeTable = () => {
  const { grades, mutateGrades } = useGrade();
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [id, setId] = useState("");

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
                <div className={styles.buttonTableWrapper}>
                  <button
                    className={styles.buttonTable}
                    onClick={() => handleOpenModal2(grade._id)}
                  >
                    Update
                  </button>
                  <button
                    className={styles.dangerButtonTable}
                    onClick={() => handleOpenModal(grade._id)}
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
      <Modal show={showModal2} onClose={handleCloseModal2}>
        <UpdateGradeForm gradeId={id} onClose={handleCloseModal2} />
      </Modal>
    </>
  );
};

export default GradeTable;
