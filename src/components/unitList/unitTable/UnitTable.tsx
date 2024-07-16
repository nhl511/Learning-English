import { useUnit } from "@/customHooks/CustomHooks";
import React, { useState } from "react";
import styles from "./unitTable.module.css";
import { UnitType } from "@/types/types";
import Modal from "@/components/modal/Modal";
import { deleteUnit } from "@/libs/actions";

const UnitTable = ({ gradeId }: { gradeId: string }) => {
  const { units, mutateUnits } = useUnit(gradeId);
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
            <th>Unit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className={styles.body}>
          {units?.map((unit: UnitType) => (
            <tr key={unit._id} className={styles.row}>
              <td>{unit.title}</td>

              <td>
                <button
                  className={styles.dangerButtonTable}
                  onClick={() => handleOpenModal(unit._id)}
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
              await deleteUnit(id);
              handleCloseModal();
              mutateUnits();
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

export default UnitTable;
