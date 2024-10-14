"use client";
import React, { useEffect, useState } from "react";
import styles from "./mobileLinks.module.css";
import { LinkType } from "@/types/types";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InfoIcon from "@mui/icons-material/Info";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HomeIcon from "@mui/icons-material/Home";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import CallIcon from "@mui/icons-material/Call";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import {
  Avatar,
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import NavLinkMobile from "../links/navLinkMobile/NavLinkMobile";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { useRouter } from "next/navigation";
import { logout } from "@/libs/actions";
import LogoutIcon from "@mui/icons-material/Logout";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";

const MobileLinks = ({ session }: any | null) => {
  const [open, setOpen] = useState(false);
  const [openCollapse, setOpenCollapse] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setOpenCollapse(!openCollapse);
  };

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
    // {
    //   title: "About",
    //   path: "/about",
    //   icon: <InfoOutlinedIcon fontSize="medium" />,
    //   icon2: <InfoIcon fontSize="medium" />,
    // },
    // {
    //   title: "Contact",
    //   path: "/contact",
    //   icon: <CallOutlinedIcon fontSize="medium" />,
    //   icon2: <CallIcon fontSize="medium" />,
    // },
  ];

  const privateLinks: LinkType[] = [
    {
      title: "Saved vocab",
      path: "/saved-vocabularies",
      icon: <BookmarkBorderOutlinedIcon fontSize="medium" />,
      icon2: <BookmarkIcon fontSize="medium" />,
    },
  ];

  const userLinks = [
    {
      title: "Personal information",
      path: "/profile",
      icon: <AccountCircleIcon fontSize="small" />,
    },
    {
      title: "Report learned vocabulary",
      path: "/report-learned-vocabulary",
      icon: <AssessmentIcon fontSize="small" />,
    },
  ];

  return (
    <div className={styles.container}>
      <Box
        className={styles.buttonWrapper}
        sx={{
          visibility: {
            xs: "visible",
            md: "hidden",
          },
        }}
      >
        <FontAwesomeIcon
          className={styles.menuButton}
          icon={faBars}
          style={{ fontSize: "20px" }}
          onClick={() => setOpen((prev) => !prev)}
        />
      </Box>

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
                className=""
                style={{ fontSize: "20px" }}
                onClick={() => setOpen((prev) => !prev)}
              />
            </div>
            <div className={styles.logo}>EngVoca</div>
          </div>
          <div className={styles.linksContainer} style={{ width: "100%" }}>
            <List sx={{ width: "100%" }} component="nav">
              {publicLinks.map((link: LinkType) => (
                <NavLinkMobile
                  key={link.path}
                  link={link}
                  onClick={() => setOpen(false)}
                />
              ))}
              {session && (
                <>
                  {privateLinks.map((privateLink: LinkType) => (
                    <NavLinkMobile
                      key={privateLink.path}
                      link={privateLink}
                      onClick={() => setOpen(false)}
                    />
                  ))}
                  <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                      <Avatar
                        sx={{ width: 24, height: 24 }}
                        alt=""
                        src={session?.user?.image}
                      />
                    </ListItemIcon>
                    <ListItemText primary={session?.user?.name} />
                    {openCollapse ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openCollapse} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {userLinks.map((userLink) => (
                        <ListItemButton
                          key=""
                          sx={{ pl: 4 }}
                          onClick={() => {
                            router.push(userLink.path);
                            setOpen(false);
                          }}
                        >
                          <ListItemIcon>{userLink.icon}</ListItemIcon>
                          <ListItemText primary={userLink.title} />
                        </ListItemButton>
                      ))}
                      <ListItemButton
                        key=""
                        sx={{ pl: 4 }}
                        onClick={async () => {
                          await logout();
                          router.push("/login");
                          setOpen(false);
                        }}
                      >
                        <ListItemIcon>
                          <LogoutIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                      </ListItemButton>
                    </List>
                  </Collapse>
                </>
              )}
            </List>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileLinks;
