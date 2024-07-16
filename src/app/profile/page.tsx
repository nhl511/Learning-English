import React from "react";
import styles from "./profile.module.css";
import { Metadata } from "next";
import Profile from "@/components/profile/Profile";
export const metadata: Metadata = {
  title: "Profile",
  description: "",
};
const ProfilePage = () => {
  return (
    <div className={styles.container}>
      <Profile />
    </div>
  );
};

export default ProfilePage;
