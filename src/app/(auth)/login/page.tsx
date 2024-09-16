import React from "react";
import type { Metadata } from "next";
import styles from "./login.module.css";
import LoginForm from "@/components/loginForm/LoginForm";
import { handleGoogleLogin } from "@/libs/actions";
import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Login",
  description: "",
};
//login

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* <LoginForm /> */}
        <form action={handleGoogleLogin}>
          <Button
            className={styles.loginBtn}
            variant="outlined"
            startIcon={
              <Image src="/images/google.svg" alt="" width={20} height={20} />
            }
            type="submit"
          >
            Continue with Google
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
