"use client";
import React, { useEffect, useState } from "react";
import styles from "./mobileLinks.module.css";
import Image from "next/image";
import { LinkType } from "@/types/types";
import NavLink from "../links/navLink/NavLink";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InfoIcon from "@mui/icons-material/Info";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HomeIcon from "@mui/icons-material/Home";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import CallIcon from "@mui/icons-material/Call";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const MobileLinks = ({ session }: any | null) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);
  const publicLinks: LinkType[] = [
    {
      title: "Homepage",
      path: "/",
      icon: <HomeOutlinedIcon fontSize="medium" />,
      icon2: <HomeIcon fontSize="medium" />,
    },
    {
      title: "About",
      path: "/about",
      icon: <InfoOutlinedIcon fontSize="medium" />,
      icon2: <InfoIcon fontSize="medium" />,
    },
    {
      title: "Contact",
      path: "/contact",
      icon: <CallOutlinedIcon fontSize="medium" />,
      icon2: <CallIcon fontSize="medium" />,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.buttonWrapper}>
        <FontAwesomeIcon
          icon={faBars}
          style={{ fontSize: "20px" }}
          onClick={() => setOpen((prev) => !prev)}
        />
      </div>

      <div className={styles.logo}>EngVoca</div>
      <div
        className={`${styles.mobileLinksWrapper} ${
          open ? styles.open : styles.notOpen
        }`}
        onClick={() => setOpen(false)}
      >
        <div
          className={`${styles.mobileLinks} ${
            open ? styles.active : styles.inactive
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.header}>
            <div className={styles.buttonWrapper}>
              <FontAwesomeIcon
                icon={faBars}
                style={{ fontSize: "20px" }}
                onClick={() => setOpen((prev) => !prev)}
              />
            </div>
            <div className={styles.logo}>EngVoca</div>
          </div>
          <div className={styles.linksContainer}>
            {publicLinks.map((link: LinkType) => {
              return (
                <div key={link.title} onClick={() => setOpen(false)}>
                  <NavLink link={link} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileLinks;
