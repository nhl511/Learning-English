import React from "react";
import styles from "./prices.module.css";
import AddPriceForm from "@/components/addPriceForm/AddPriceForm";
import PriceTable from "@/components/priceList/priceTable/PriceTable";
const PricesPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <AddPriceForm />
      </div>
      <div className={styles.list}>
        <PriceTable />
      </div>
    </div>
  );
};

export default PricesPage;
