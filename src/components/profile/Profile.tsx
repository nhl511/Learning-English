"use client";
import { useEffect, useState } from "react";
import Modal from "../modal/Modal";
import styles from "./profile.module.css";
import { useSession, useUserInfo } from "@/customHooks/CustomHooks";
import { useFormik } from "formik";
import * as Yup from "yup";
import { changePassword, checkPassword } from "@/libs/actions";
import { toast } from "react-toastify";
import moment from "moment";

const Profile = () => {
  const [state, setState] = useState<any>(undefined);

  const { sessionData } = useSession();
  const { userInfoData } = useUserInfo(sessionData?.user?.id);
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
            <h3>{userInfoData?.grade?.title}</h3>
          </div>
          <div className={styles.row}>
            <p>Pro plan expiration date</p>
            <h3>
              {userInfoData?.endActiveDate
                ? moment(userInfoData?.endActiveDate)
                    .locale("vi")
                    .format("DD-MM-YYYY")
                : "Not yet active"}
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
