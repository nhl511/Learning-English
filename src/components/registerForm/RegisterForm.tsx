"use client";
import React, { useEffect, useState } from "react";
import styles from "./registerForm.module.css";
import { register } from "@/libs/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const [state, setState] = useState<any>(undefined);
  const router = useRouter();

  const notifyError = () => {
    toast.error(state?.error);
    setState(undefined);
  };

  const notifySuccess = () => {
    toast.success("Successful account registration");
    setState(undefined);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordRepeat: "",
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
      passwordRepeat: Yup.string()
        .oneOf([Yup.ref("password")], "Password's not match")
        .required("Repeat password is required"),
    }),

    onSubmit: (values) => {
      register({
        username: values.username,
        password: values.password,
        passwordRepeat: values.passwordRepeat,
      }).then((res) => {
        setState(res);
      });
    },
  });

  useEffect(() => {
    if (state?.success) {
      notifySuccess();
      router.push("/login");
    }
  }, [state?.success, router]);

  useEffect(() => {
    if (state?.error) notifyError();
  }, [state?.error]);

  return (
    <>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <h2>Sign up</h2>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Enter username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            autoComplete="off"
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
        <div className={styles.inputWrapper}>
          <input
            type="password"
            placeholder="Repeat password"
            name="passwordRepeat"
            value={formik.values.passwordRepeat}
            onChange={formik.handleChange}
            className={`${
              formik.errors.passwordRepeat &&
              formik.touched.passwordRepeat &&
              styles.inputError
            }`}
          />
          {formik.errors.passwordRepeat && formik.touched.passwordRepeat && (
            <p className={styles.error}>{formik.errors.passwordRepeat}</p>
          )}
        </div>

        <button>Register</button>
      </form>
      <Link href="/login" className={styles.link}>
        Have an account? <b>Login</b>
      </Link>
    </>
  );
};

export default RegisterForm;
