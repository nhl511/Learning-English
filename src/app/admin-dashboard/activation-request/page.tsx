import React from "react";
import styles from "./activationRequest.module.css";
import RequestList from "@/components/requestList/RequestList";

const ActivationRequest = () => {
  return (
    <div className={styles.container}>
      <div className={styles.list}>
        <RequestList />
      </div>
    </div>
  );
};

export default ActivationRequest;
