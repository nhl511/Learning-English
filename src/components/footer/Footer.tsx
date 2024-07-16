import React from "react";
import styles from "./footer.module.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import GoogleIcon from "@mui/icons-material/Google";
import TelegramIcon from "@mui/icons-material/Telegram";
import Link from "next/link";
import { auth } from "@/libs/auth";
const Footer = async () => {
  const session = await auth();
  const publicLinks = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "About",
      path: "/about",
    },
    {
      title: "Contact",
      path: "/contact",
    },
  ];
  const privateLinks = [
    {
      title: "Saved vocabularies",
      path: `/saved-vocabularies/${session?.user?.id}`,
    },
    {
      title: "Profile",
      path: "/profile",
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.iconWrapper}>
          <Link href="https://www.facebook.com/NguyenVanLamPY">
            <FacebookIcon />
          </Link>
          <Link href="https://www.youtube.com/@nguyenvanlam8079/videos">
            <YouTubeIcon />
          </Link>
          <Link href="mailto:vanlam71@gmail.com">
            <GoogleIcon />
          </Link>
          <Link href="https://t.me/nhl5110">
            <TelegramIcon />
          </Link>
        </div>
        <div className={styles.linksWrapper}>
          {publicLinks.map((link) => (
            <Link key={link.title} href={link.path}>
              {link.title}
            </Link>
          ))}
          {session &&
            privateLinks.map((link) => (
              <Link key={link.title} href={link.path}>
                {link.title}
              </Link>
            ))}
        </div>
        <div className={styles.copywriteWrapper}>
          <p>&copy; 2024 vanlam</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
