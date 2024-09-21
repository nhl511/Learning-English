"use client";
import React from "react";
import styles from "./userTable.module.css";
import { useUsers } from "@/customHooks/CustomHooks";
import Image from "next/image";
import { Alert, Badge } from "@mui/material";
import moment from "moment";
import CheckIcon from "@mui/icons-material/Check";

const UserTable = () => {
  const { usersData } = useUsers();
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
                  {user?.isActive && (
                    <div className={styles.dateWrapper}>
                      {user?.endActiveDate && (
                        <Alert
                          icon={<CheckIcon fontSize="inherit" />}
                          severity="success"
                          sx={{ width: "max-content" }}
                        >
                          {"Active until " +
                            moment(user?.endActiveDate)
                              .locale("vi")
                              .format("DD-MM-YYYY")}
                        </Alert>
                      )}
                    </div>
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
