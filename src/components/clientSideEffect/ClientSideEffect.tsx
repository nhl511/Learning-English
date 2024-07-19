"use client";
import React, { useEffect } from "react";
const documentHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty("--doc-height", `${window.innerHeight}px`);
};

const ClientSideEffect = () => {
  useEffect(() => {
    // Set the initial height
    documentHeight();

    // Update height on window resize
    window.addEventListener("resize", documentHeight);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", documentHeight);
    };
  }, []);

  return null;
};

export default ClientSideEffect;
