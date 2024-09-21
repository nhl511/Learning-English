import React from "react";
import styles from "./priceList.module.css";
import PriceTable from "./priceTable/PriceTable";

const PriceList = () => {
  return (
    <div className={styles.container}>
      <PriceTable />
    </div>
  );
};

export default PriceList;
