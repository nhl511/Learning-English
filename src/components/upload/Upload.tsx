"use client";
import { UploadDropzone } from "@/libs/uploadthing";
import React from "react";
import Link from "next/link";
import styles from "./Upload.module.css";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Upload = ({
  files,
  setFiles,
}: {
  files: { key: string; url: string; name: string }[];
  setFiles: any;
}) => {
  const fileList = (
    <>
      {files.map((file) => (
        <div key={file.key} className={styles.fileWrapper}>
          <FontAwesomeIcon icon={faPaperclip} style={{ color: "#ffffff" }} />
          <Link href={file.url} className={styles.fileLink}>
            {file.name}
          </Link>
          <input type="hidden" value={file.url} name="audioLink" />
        </div>
      ))}
    </>
  );
  return (
    <div className={styles.container}>
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          if (res) {
            setFiles(res);
            const json = JSON.stringify(res);
          }
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
      {fileList}
    </div>
  );
};

export default Upload;
