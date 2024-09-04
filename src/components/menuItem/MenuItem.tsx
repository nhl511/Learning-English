import React, { useState } from "react";
import styles from "./menuItem.module.css";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import KeyboardDoubleArrowDownOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowDownOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useRouter } from "next/navigation";

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

  return (
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
              onClick={() => router.push(item.path)}
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
  );
};

export default MenuItem;
