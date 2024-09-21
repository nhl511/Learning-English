"use client";
import React from "react";
import styles from "./priceTable.module.css";
import { usePrices } from "@/customHooks/CustomHooks";
import { Button } from "@mui/material";
import { handlePrice } from "@/libs/actions";
import { vnd } from "@/libs/currency";
const PriceTable = () => {
  const { prices, mutatePrices } = usePrices();
  return (
    <>
      <table className={styles.table}>
        <thead className={styles.head}>
          <tr className={styles.row}>
            <th>ID</th>
            <th>Duration</th>
            <th>Price</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody className={styles.body}>
          {prices?.map((price: any) => (
            <tr key={price?._id} className={styles.row}>
              <td>{price?._id}</td>
              <td>{price?.duration} months</td>
              <td>{vnd(price?.price)}</td>
              <td>
                <div className={styles.buttonTableWrapper}>
                  {price?.isActive ? (
                    <Button
                      size="small"
                      variant="contained"
                      onClick={async () => {
                        await handlePrice(price?._id, false);
                        mutatePrices();
                      }}
                      sx={{
                        background: "#ffffff !important",
                        color: "#000000 !important",
                      }}
                    >
                      Inactive
                    </Button>
                  ) : (
                    <Button
                      size="small"
                      variant="contained"
                      onClick={async () => {
                        await handlePrice(price?._id, true);
                        mutatePrices();
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

export default PriceTable;
