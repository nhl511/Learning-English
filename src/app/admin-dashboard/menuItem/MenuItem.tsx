"use client";
import React from "react";
import styles from "./menuItem.module.css";
import { usePathname } from "next/navigation";

const MenuItem = ({ link }: { link: any }) => {
  const pathName = usePathname();

  return (
    <div
      className={`${styles.container} ${
        pathName === link.path && styles.active
      }`}
    >
      {link.title}
    </div>
  );
};

export default MenuItem;
