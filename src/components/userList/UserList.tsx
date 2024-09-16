import React from "react";
import UserTable from "./userTable/UserTable";
import styles from "./userList.module.css";

const UserList = () => {
  return (
    <div className={styles.container}>
      <UserTable />
    </div>
  );
};

export default UserList;
