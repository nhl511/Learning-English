import React from "react";
import type { Metadata } from "next";
import styles from "./login.module.css";
import LoginForm from "@/components/loginForm/LoginForm";

export const metadata: Metadata = {
  title: "Login",
  description: "",
};

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
