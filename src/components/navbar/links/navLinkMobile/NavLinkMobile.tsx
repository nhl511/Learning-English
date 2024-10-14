import { LinkType } from "@/types/types";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import styles from "./navLinkMobile.module.css";

const NavLinkMobile = ({
  link,
  onClick,
}: {
  link: LinkType;
  onClick: React.MouseEventHandler<HTMLElement>;
}) => {
  const pathName = usePathname();

  return (
    <Link
      href={link.path}
      className={`${pathName === link.path && styles.active}`}
      onClick={onClick}
    >
      <ListItemButton>
        <ListItemIcon className={`${pathName === link.path && styles.active}`}>
          {pathName === link.path ? link.icon2 : link.icon}
        </ListItemIcon>
        <ListItemText primary={link.title} />
      </ListItemButton>
    </Link>
  );
};

export default NavLinkMobile;
