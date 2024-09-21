"use client";
import React, { useState } from "react";
import styles from "./addPriceForm.module.css";
import { addPrice } from "@/libs/actions";
import { usePrices } from "@/customHooks/CustomHooks";

const AddPriceForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [duration, setDuration] = useState<any>("");
  const [price, setPrice] = useState<any>("");
  const { mutatePrices } = usePrices();

  return (
    <form
      className={styles.form}
      action={async (formData) => {
        setIsLoading(true);
        await addPrice(formData);
        mutatePrices();
        setIsLoading(false);
        setDuration("");
        setPrice("");
      }}
    >
      <input
        type="number"
        placeholder="Enter duration (year)"
        name="duration"
        value={duration}
        onChange={(e) => setDuration(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="Enter prices (VND)"
        name="price"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
      />
      <button>Add</button>
    </form>
  );
};

export default AddPriceForm;
