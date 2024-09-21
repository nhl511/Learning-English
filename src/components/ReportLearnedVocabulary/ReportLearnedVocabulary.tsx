"use client";
import { useGrade, useSession, useUserInfo } from "@/customHooks/CustomHooks";
import React, { useEffect, useState } from "react";
import Grade from "./grade/Grade";
import styles from "./reportLearnedVacabulary.module.css";
import KeyboardAltOutlinedIcon from "@mui/icons-material/KeyboardAltOutlined";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import { Modal } from "@mui/material";
import Pricing from "../pricing/Pricing";

const ReportLearnedVocabulary = () => {
  const { grades } = useGrade();
  const [type, setType] = useState("writing");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const { sessionData } = useSession();
  const { userInfoData } = useUserInfo(sessionData?.user?.id);

  useEffect(() => {
    if (!userInfoData.isActive) setIsOpenModal(true);
  }, [userInfoData]);

  return (
    <div className={styles.container}>
      <div className={styles.optionWrapper}>
        <div
          className={`${type === "writing" && styles.active} ${styles.option}`}
        >
          <KeyboardAltOutlinedIcon />
          <p onClick={() => setType("writing")}>Typing</p>
        </div>
        <div
          className={`${type === "speaking" && styles.active} ${styles.option}`}
        >
          {" "}
          <MicNoneOutlinedIcon />
          <p onClick={() => setType("speaking")}>Speaking</p>
        </div>
      </div>
      {grades?.map((grade: any) => (
        <Grade key="" grade={grade} type={type} />
      ))}
      <Modal
        open={isOpenModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Pricing
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          userId={sessionData?.user?.id}
        />
      </Modal>
    </div>
  );
};

export default ReportLearnedVocabulary;
