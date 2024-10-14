import { useUnit } from "@/customHooks/CustomHooks";
import React, { useState } from "react";
import styles from "./unitTable.module.css";
import { UnitType } from "@/types/types";
import Modal from "@/components/modal/Modal";
import { deleteUnit } from "@/libs/actions";
import UpdateUnitForm from "./updateUnitForm/UpdateUnitForm";

const UnitTable = ({ gradeId }: { gradeId: string }) => {
  const { units, mutateUnits } = useUnit(gradeId);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [id, setId] = useState("");

  const handleOpenModal = (id: string) => {
    setShowModal(true);
    setId(id);
  };

  const handleOpenModal2 = (id: string) => {
    setShowModal2(true);
    setId(id);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleCloseModal2 = () => {
    setShowModal2(false);
  };
  return (
    <>
      <table className={styles.table}>
        <thead className={styles.head}>
          <tr className={styles.row}>
            <th>ID</th>
            <th>Unit</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className={styles.body}>
          {units?.map((unit: UnitType) => (
            <tr key={unit._id} className={styles.row}>
              <td>{unit._id}</td>
              <td>{unit.title}</td>
              <td>{unit.description}</td>
              <td>
                <div className={styles.buttonTableWrapper}>
                  <button
                    className={styles.buttonTable}
                    onClick={() => handleOpenModal2(unit._id)}
                  >
                    Update
                  </button>
                  <button
                    className={styles.dangerButtonTable}
                    onClick={() => handleOpenModal(unit._id)}
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
      <Modal show={showModal2} onClose={handleCloseModal2}>
        <UpdateUnitForm
          unitId={id}
          gradeId={gradeId}
          onClose={handleCloseModal2}
        />
      </Modal>
    </>
  );
};

export default UnitTable;
