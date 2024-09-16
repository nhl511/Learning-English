import React from "react";
import styles from "./users.module.css";
import UserList from "@/components/userList/UserList";

const UsersPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.list}>
        <UserList />
      </div>
    </div>
  );
};

export default UsersPage;
