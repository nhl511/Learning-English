import { addVocabularies } from "@/libs/actions";
import React, { useState } from "react";
import styles from "./uploadExcel.module.css";
import * as XLSX from "xlsx";

const UploadExcel = ({ onClose }: { onClose: any }) => {
  const [data, setData] = useState<any>([]);

  const handleFileUpload = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event: any) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });

      // Assuming the data is in the first sheet
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setData(parsedData);
    };

    reader.readAsBinaryString(file);
  };

  const handleUpload = async () => {
    await addVocabularies(data);
    onClose();
  };

  return (
    <div className={styles.container}>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      <button className={styles.importButton} onClick={handleUpload}>
        Import
      </button>
    </div>
  );
};

export default UploadExcel;
