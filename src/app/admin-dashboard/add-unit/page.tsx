import React from "react";
import styles from "./addUnit.module.css";
import AddUnitForm from "@/components/addUnitForm/AddUnitForm";
import UnitList from "@/components/unitList/UnitList";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Units management",
  description: "",
};

const AddUnitPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <Link href="/admin-dashboard/add-vocabulary">
          <button>Add new vocabulary</button>
        </Link>
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.wrapper}>
          <AddUnitForm />
        </div>
        <div className={styles.list}>
          <UnitList />
        </div>
      </div>
    </div>
  );
};

export default AddUnitPage;
