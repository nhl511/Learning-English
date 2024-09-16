import React from "react";
import type { Metadata } from "next";
import styles from "./register.module.css";
import RegisterForm from "@/components/registerForm/RegisterForm";

export const metadata: Metadata = {
  title: "Register",
  description: "",
};

const Register = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>{/* <RegisterForm /> */}</div>
    </div>
  );
};

export default Register;
