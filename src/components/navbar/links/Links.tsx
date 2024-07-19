"use client";
import { LinkType } from "@/types/types";
import React from "react";
import styles from "./links.module.css";
import NavLink from "./navLink/NavLink";

import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InfoIcon from "@mui/icons-material/Info";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HomeIcon from "@mui/icons-material/Home";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import CallIcon from "@mui/icons-material/Call";

const Links = ({ session }: any | null) => {
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
      <div className={styles.links}>
        {publicLinks.map((link: LinkType) => {
          return <NavLink key={link.title} link={link} />;
        })}
        {session && (
          <>
            {session?.user.isAdmin && (
              <NavLink
                link={{
                  title: "Admin",
                  path: "/admin-dashboard",
                  icon: <AdminPanelSettingsOutlinedIcon fontSize="medium" />,
                  icon2: <AdminPanelSettingsIcon fontSize="medium" />,
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Links;
