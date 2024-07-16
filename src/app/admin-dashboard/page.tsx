import React from "react";
import styles from "./adminDashboard.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "",
};
const AdminDashboard = () => {
  return <div className={styles.container}></div>;
};

export default AdminDashboard;
