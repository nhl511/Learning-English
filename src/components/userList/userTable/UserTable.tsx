import React from "react";
import styles from "./userTable.module.css";

const UserTable = () => {
  return (
    <>
      <table className={styles.table}>
        <thead className={styles.head}>
          <tr className={styles.row}>
            <th>Avatar</th>
            <th>Email</th>
            <th>Name</th>
            <th>Grade</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className={styles.body}>
          {/* {grades?.map((grade: GradeType) => (
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
          ))} */}
        </tbody>
      </table>
    </>
  );
};

export default UserTable;
