"use client";
import React from "react";
import styles from "./userMenu.module.css";

import { useRouter } from "next/navigation";
import { logout } from "@/libs/actions";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LogoutIcon from "@mui/icons-material/Logout";
const UserMenu = ({ session }: any | null) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box className={styles.container}>
      {session ? (
        <div className={styles.userContainer}>
          <IconButton
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <Chip
              avatar={<Avatar alt="" src={session?.user?.image} />}
              label={session?.user?.name}
              variant="outlined"
              sx={{
                visibility: {
                  xs: "hidden",
                  md: "visible",
                },
              }}
            />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuList>
              {userLinks.map((userLink) => (
                <MenuItem
                  onClick={() => {
                    router.push(userLink.path);
                    handleClose();
                  }}
                  key={userLink.title}
                >
                  <ListItemIcon>{userLink.icon}</ListItemIcon>
                  <ListItemText> {userLink.title}</ListItemText>
                </MenuItem>
              ))}
              <Divider />

              <MenuItem
                onClick={async () => {
                  await logout();
                  router.push("/login");
                  handleClose();
                }}
              >
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      ) : (
        <button
          className={styles.loginButton}
          onClick={() => router.push("/login")}
        >
          Login
        </button>
      )}
    </Box>
  );
};

export default UserMenu;
