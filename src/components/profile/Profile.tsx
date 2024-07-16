"use client";
import { useEffect, useState } from "react";
import Modal from "../modal/Modal";
import styles from "./profile.module.css";
import {
  useGradeById,
  useSession,
  useUserInfo,
} from "@/customHooks/CustomHooks";
import { useFormik } from "formik";
import * as Yup from "yup";
import { changePassword, checkPassword } from "@/libs/actions";
import { toast } from "react-toastify";

const Profile = () => {
  const [state, setState] = useState<any>(undefined);

  const { sessionData } = useSession();
  const { userInfoData } = useUserInfo(sessionData?.user?.id);
  const { grade } = useGradeById(userInfoData?.gradeId);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const notifySuccess = () => {
    toast.success("Change password successfully");
  };

  useEffect(() => {
    if (!showModal) {
      formik.resetForm();
      setState(undefined);
    }
  }, [showModal]);

  useEffect(() => {
    if (!showModal2) {
      formik2.resetForm();
    }
  }, [showModal2]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal2 = () => {
    setShowModal2(true);
  };

  const handleCloseModal2 = () => {
    setShowModal2(false);
  };

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .max(25, "Maximum 25 characters")
        .required("Password is required"),
    }),

    onSubmit: (values) => {
      checkPassword({
        username: userInfoData?.username,
        password: values.password,
      }).then((res) => {
        setState(res);
      });
    },
  });

  const formik2 = useFormik({
    initialValues: {
      password: "",
      passwordRepeat: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .max(25, "Maximum 25 characters")
        .required("Password is required"),
      passwordRepeat: Yup.string()
        .oneOf([Yup.ref("password")], "Password's not match")
        .required("Repeat password is required"),
    }),

    onSubmit: (values) => {
      changePassword({
        userId: userInfoData?._id,
        newPassword: values.password,
      });
      handleCloseModal2();
      notifySuccess();
    },
  });

  useEffect(() => {
    if (state?.success) {
      handleCloseModal();
      handleOpenModal2();
    }
  }, [state?.success]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.row}>
            <p>User ID</p>
            <h3>{userInfoData?._id}</h3>
          </div>
          <div className={styles.row}>
            <p>Username</p>
            <h3>{userInfoData?.username}</h3>
          </div>
          <div className={styles.row}>
            <p>Grade</p>
            <h3>{grade?.title}</h3>
          </div>
          <div className={styles.row}>
            <div className={styles.buttonWrapper}>
              <button onClick={handleOpenModal}>Change password</button>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showModal} onClose={handleCloseModal}>
        <h2>Confirm password</h2>
        <form className={styles.confirmForm} onSubmit={formik.handleSubmit}>
          <div className={styles.inputWrapper}>
            <input
              placeholder="Enter current password"
              name="password"
              value={formik.values.password}
              onChange={(event) => {
                formik.handleChange(event);
                setState(undefined);
              }}
              className={`${
                formik.errors.password &&
                formik.touched.password &&
                styles.inputError
              }`}
              type="password"
            />
            {formik.errors.password && formik.touched.password && (
              <p className={styles.error}>{formik.errors.password}</p>
            )}
            <p className={styles.error}>{state?.error}</p>
          </div>
          <button className={styles.button}>Continue</button>
        </form>
      </Modal>
      <Modal show={showModal2} onClose={handleCloseModal2}>
        <h2>Change password</h2>
        <form className={styles.form} onSubmit={formik2.handleSubmit}>
          <div className={styles.inputWrapper}>
            <input
              placeholder="Enter new password"
              name="password"
              value={formik2.values.password}
              onChange={formik2.handleChange}
              className={`${
                formik2.errors.password &&
                formik2.touched.password &&
                styles.inputError
              }`}
              type="password"
            />
            {formik2.errors.password && formik2.touched.password && (
              <p className={styles.error}>{formik2.errors.password}</p>
            )}
            <p className={styles.error}>{state?.error}</p>
          </div>
          <div className={styles.inputWrapper}>
            <input
              type="password"
              placeholder="Repeat password"
              name="passwordRepeat"
              value={formik2.values.passwordRepeat}
              onChange={formik2.handleChange}
              className={`${
                formik2.errors.passwordRepeat &&
                formik2.touched.passwordRepeat &&
                styles.inputError
              }`}
            />
            {formik2.errors.passwordRepeat &&
              formik2.touched.passwordRepeat && (
                <p className={styles.error}>{formik2.errors.passwordRepeat}</p>
              )}
          </div>
          <button className={styles.button}>Change password</button>
        </form>
      </Modal>
    </>
  );
};

export default Profile;
