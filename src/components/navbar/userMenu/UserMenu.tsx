"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./userMenu.module.css";

import { useRouter } from "next/navigation";
import { logout } from "@/libs/actions";
import Image from "next/image";

const UserMenu = ({ session }: any | null) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const userLinks = [
    {
      title: "Personal information",
      path: "/profile",
    },
    {
      title: "Report learned vocabulary",
      path: "/report-learned-vocabulary",
    },
  ];

  let menuRef = useRef<any>();
  useEffect(() => {
    let handler = (e: any) => {
      if (!menuRef?.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div className={styles.container}>
      {session ? (
        <div className={styles.userContainer} ref={menuRef}>
          <div className={styles.userWrapper} onClick={() => setOpen(!open)}>
            <Image
              src={session?.user?.image}
              alt=""
              width={20}
              height={20}
              style={{ borderRadius: "50%" }}
            />
            <p>{session?.user?.name}</p>
          </div>
          <div
            className={`${styles.userMenu} ${
              open ? styles.active : styles.inactive
            }`}
          >
            <ul>
              {userLinks.map((userLink) => (
                <li
                  key={userLink.title}
                  className={styles.dropdownItem}
                  onClick={() => {
                    router.push(userLink.path);
                    setOpen(false);
                  }}
                >
                  <p>{userLink.title}</p>
                </li>
              ))}
              <li
                className={styles.dropdownItem}
                onClick={async () => {
                  await logout();
                  router.push("/login");
                }}
              >
                <p>Logout</p>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          className={styles.loginButton}
          onClick={() => router.push("/login")}
        >
          Login
        </button>
      )}
    </div>
  );
};

export default UserMenu;
