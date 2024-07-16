"use client";
import { LinkType } from "@/types/types";
import Link from "next/link";
import React from "react";
import styles from "./navLink.module.css";
import { usePathname } from "next/navigation";

const NavLink = ({ link }: { link: LinkType }) => {
  const pathName = usePathname();

  return (
    <Link
      href={link.path}
      className={`${styles.container} ${
        pathName === link.path && styles.active
      }`}
    >
      {pathName === link.path ? link.icon2 : link.icon}
      <span>{link.title}</span>
    </Link>
  );
};

export default NavLink;
