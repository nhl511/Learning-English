"use client";
import React, { useState } from "react";
import styles from "./loginForm.module.css";
import Link from "next/link";
import { login } from "@/libs/actions";
import { useFormik } from "formik";
import * as Yup from "yup";
import Spinner from "../spinner/Spinner";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState<any>(undefined);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(6, "Mininum 6 characters")
        .max(25, "Maximum 25 characters")
        .required("Username is required"),
      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .max(25, "Maximum 25 characters")
        .required("Password is required"),
    }),

    onSubmit: (values) => {
      setIsLoading(true);
      login({
        username: values.username,
        password: values.password,
      })
        .then((res) => {
          setState(res);
        })
        .then(() => setIsLoading(false));
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <h2>Sign in</h2>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Enter username"
            name="username"
            autoComplete="off"
            value={formik.values.username}
            onChange={formik.handleChange}
            className={`${
              formik.errors.username &&
              formik.touched.username &&
              styles.inputError
            }`}
          />
          {formik.errors.username && formik.touched.username && (
            <p className={styles.error}>{formik.errors.username}</p>
          )}
        </div>
        <div className={styles.inputWrapper}>
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            className={`${
              formik.errors.password &&
              formik.touched.password &&
              styles.inputError
            }`}
          />
          {formik.errors.password && formik.touched.password && (
            <p className={styles.error}>{formik.errors.password}</p>
          )}
        </div>

        <button
          className={`${styles.button} ${
            isLoading ? styles.disabled : styles.active
          }`}
          disabled={!isLoading ? false : true}
        >
          {!isLoading ? "Login" : <Spinner />}
        </button>
        <p className={styles.error}>{state?.error}</p>
      </form>
      <Link href="/register" className={styles.link}>
        {"Don't have an account?"} <b>Register</b>
      </Link>
    </>
  );
};

export default LoginForm;
