"use client";
import React from "react";
import styles from "./userTable.module.css";
import { useUsers } from "@/customHooks/CustomHooks";
import Image from "next/image";
import { Badge, Button } from "@mui/material";
import { activeUser, disableUser } from "@/libs/actions";

const UserTable = () => {
  const { usersData, mutateUsers } = useUsers();
  return (
    <>
      <table className={styles.table}>
        <thead className={styles.head}>
          <tr className={styles.row}>
            <th>Avatar</th>
            <th>Email</th>
            <th>Name</th>
            <th>Grade</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody className={styles.body}>
          {usersData?.map((user: any) => (
            <tr key={user?._id} className={styles.row}>
              <td>
                <Badge
                  badgeContent={"Admin"}
                  color="secondary"
                  invisible={user?.isAdmin ? false : true}
                >
                  <Image src={user?.img} alt="" width={50} height={50} />
                </Badge>
              </td>
              <td>{user?.username}</td>
              <td>{user?.name}</td>
              <td>{user?.grade?.title}</td>
              <td>
                <div className={styles.buttonTableWrapper}>
                  {user?.isActive ? (
                    <Button
                      variant="contained"
                      onClick={async () => {
                        await disableUser(user?._id);
                        mutateUsers();
                      }}
                      sx={{
                        background: "#ffffff !important",
                        color: "#000000 !important",
                      }}
                    >
                      Disable
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={async () => {
                        await activeUser(user?._id);
                        mutateUsers();
                      }}
                    >
                      Active
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserTable;
