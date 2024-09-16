import React, { useState } from "react";
import styles from "./menuItem.module.css";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import KeyboardDoubleArrowDownOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowDownOutlined";
import { useRouter } from "next/navigation";
import { useSession, useUserInfo } from "@/customHooks/CustomHooks";
import { Box, Modal, Typography } from "@mui/material";

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
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
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
                className={styles.item}
                key={item.title}
                onClick={(e) => {
                  if (title === "learn") {
                    router.push(item.path);
                    e.stopPropagation();
                  } else {
                    if (userInfoData?.isActive) {
                      router.push(item.path);
                      e.stopPropagation();
                    } else {
                      setIsOpenModal(true);
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
        onClose={() => setIsOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Your account need activate to continue
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Please contact admin for active your account
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default MenuItem;
