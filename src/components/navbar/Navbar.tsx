import React from "react";
import styles from "./navbar.module.css";
import Links from "./links/Links";
import { auth } from "@/libs/auth";
import UserMenu from "./userMenu/UserMenu";
import MobileLinks from "./mobileLinks/MobileLinks";
const Navbar = async () => {
  const session = await auth();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <MobileLinks session={session} />
        <Links session={session} />
        <UserMenu session={session} />
      </div>
    </div>
  );
};

export default Navbar;
