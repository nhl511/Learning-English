import React from "react";
import styles from "./requestList.module.css";
import RequestTable from "./requestTable/RequestTable";

const RequestList = () => {
  return (
    <div className={styles.container}>
      <RequestTable />
    </div>
  );
};

export default RequestList;
