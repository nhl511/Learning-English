"use client";
import React, { useState } from "react";
import styles from "./requestTable.module.css";
import { useActiveRequests } from "@/customHooks/CustomHooks";
import { Button, Chip } from "@mui/material";
import moment from "moment";
import { cancelRequest, comfirmRequest } from "@/libs/actions";
import { vnd } from "@/libs/currency";

const RequestTable = () => {
  const statuses = ["pending", "confirmed", "canceled"];
  const [selectedItem, setSelectedItem] = useState("pending");
  const { requests, mutateRequests } = useActiveRequests(selectedItem);

  return (
    <>
      <select name="" id="" onChange={(e) => setSelectedItem(e.target.value)}>
        {statuses.map((status) => (
          <option value={status} key={status}>
            {status}
          </option>
        ))}
      </select>
      <table className={styles.table}>
        <thead className={styles.head}>
          <tr className={styles.row}>
            <th>Email</th>
            <td>Phone Number</td>
            <th>Package</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className={styles.body}>
          {requests?.map((request: any) => (
            <tr key={request?._id} className={styles.row}>
              <td>{request?.user?.username}</td>
              <td>{request?.phone}</td>

              <td>
                {request?.price?.duration} months ({vnd(request?.price?.price)})
              </td>
              <td>
                {moment(request?.createdAt)
                  .locale("vi")
                  .format("HH:mm, DD-MM-YYYY")}
              </td>
              <td>
                <Chip
                  variant="filled"
                  label={request?.status}
                  color={
                    request?.status === "pending"
                      ? "warning"
                      : request?.status === "confirmed"
                      ? "success"
                      : "error"
                  }
                />
              </td>
              <td>
                <div className={styles.buttonTableWrapper}>
                  {request?.status === "pending" && (
                    <div style={{ display: "flex", gap: "10px" }}>
                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        onClick={async () => {
                          await comfirmRequest({
                            requestId: request?._id,
                            userId: request?.user?._id,
                            duration: request?.price?.duration,
                          });
                          mutateRequests();
                        }}
                      >
                        Confirm
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        color="error"
                        onClick={async () => {
                          await cancelRequest(request?._id);
                          mutateRequests();
                        }}
                      >
                        Cancel
                      </Button>
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

export default RequestTable;
