"use client";
import { useState } from "react";
import styles from "./profile.module.css";
import { useSession, useUserInfo } from "@/customHooks/CustomHooks";

import moment from "moment";
import Image from "next/image";
import { Chip, Modal, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Pricing from "../pricing/Pricing";

const Profile = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { sessionData } = useSession();
  const { userInfoData } = useUserInfo(sessionData?.user?.id);
  const [selectedIndex, setSelectedIndex] = useState(1);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Image
            alt=""
            src={userInfoData?.img}
            width={100}
            height={100}
            style={{ marginBottom: "20px" }}
          />

          <div className={styles.row}>
            <Typography variant="h6">{userInfoData?.username}</Typography>
            <Typography variant="caption">ID: {userInfoData?._id}</Typography>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Typography variant="body2">Grade</Typography>
            <Typography variant="subtitle1">
              {userInfoData?.grade?.title}
            </Typography>
          </div>
        </div>
        <div className={styles.item}>
          {userInfoData?.isActive ? (
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography variant="caption">
                Expires on{" "}
                {userInfoData?.endActiveDate &&
                  moment(userInfoData?.endActiveDate)
                    .locale("vi")
                    .format("DD-MM-YYYY")}
              </Typography>
              <Chip
                icon={<StarIcon />}
                label="Pro"
                variant="filled"
                color="primary"
              />
            </div>
          ) : (
            <Chip
              icon={<LockOpenIcon />}
              label="Upgrade to Pro"
              variant="outlined"
              onClick={() => setIsOpenModal(true)}
            />
          )}
        </div>
      </div>
      <Modal
        open={isOpenModal}
        onClose={() => {
          setIsOpenModal(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Pricing
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          userId={sessionData?.user?.id}
        />
      </Modal>
    </>
  );
};

export default Profile;
