"use client";
import React, { useEffect, useState } from "react";
import styles from "./menuItem.module.css";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import KeyboardDoubleArrowDownOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowDownOutlined";
import { useRouter } from "next/navigation";
import {
  useActiveRequest,
  useSession,
  useUserInfo,
} from "@/customHooks/CustomHooks";
import { Backdrop, CircularProgress, Modal, Typography } from "@mui/material";
import Pricing from "../pricing/Pricing";

const MenuItem = ({
  title,
  number,
  items,
}: {
  title: string;
  number: number;
  items: any;
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { sessionData } = useSession();
  const { userInfoData } = useUserInfo(sessionData?.user?.id);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isClickedItem, setIsClickedItem] = useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  return (
    <>
      <div className={styles.menuItem} onClick={() => setIsOpen(!isOpen)}>
        <div className={styles.menuTop}>
          {isOpen ? (
            <KeyboardDoubleArrowDownOutlinedIcon />
          ) : (
            <KeyboardDoubleArrowRightOutlinedIcon />
          )}
          <div className={styles.menuTitle}>
            <h2>{title.toUpperCase()}</h2>
            <p>{number} vocabularies</p>
          </div>
        </div>

        {isOpen && (
          <>
            <hr />
            {items.map((item: any) => (
              <div
                className={`${styles.item} ${
                  isClickedItem === item.title && styles.clicked
                }`}
                key={item.title}
                onClick={(e) => {
                  if (title === "learn") {
                    setIsClickedItem(item.title);

                    router.push(item.path);
                    e.stopPropagation();
                  } else {
                    if (userInfoData) {
                      if (userInfoData?.isActive) {
                        setIsClickedItem(item.title);

                        router.push(item.path);
                        e.stopPropagation();
                      } else {
                        setIsOpenModal(true);
                        e.stopPropagation();
                      }
                    } else {
                      router.push("/login");
                    }
                  }
                }}
              >
                <div className={styles.itemLeft}>
                  {item.icon}
                  <div className={styles.itemTitle}>
                    <h3>{item.title}</h3>
                    <p>{item.des}</p>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <Modal
        open={isOpenModal}
        onClose={() => {
          setIsOpenModal(false);
          setIsClickedItem("");
          setSelectedIndex(1);
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
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={isClickedItem !== "" ? true : false}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default MenuItem;
