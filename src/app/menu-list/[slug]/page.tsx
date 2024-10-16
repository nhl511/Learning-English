"use client";
import React from "react";
import styles from "./menuList.module.css";
import { useRouter } from "next/navigation";
import {
  useGradeById,
  useNumberOfVocabulary,
  useUnitById,
} from "@/customHooks/CustomHooks";
import MenuItem from "@/components/menuItem/MenuItem";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import KeyboardAltOutlinedIcon from "@mui/icons-material/KeyboardAltOutlined";
import KeyboardVoiceOutlinedIcon from "@mui/icons-material/KeyboardVoiceOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import LoadingUI from "@/components/loading/Loading";
import { Box, Button } from "@mui/material";

const MenuList = ({ params }: any) => {
  const { slug } = params;
  const router = useRouter();
  const { unit, isLoadingUnit } = useUnitById(slug);
  const { grade, isLoadingGrade } = useGradeById(unit?.gradeId);
  const { number, isLoadingNumber } = useNumberOfVocabulary(unit?._id);

  const studyItems = [
    {
      title: "Typing",
      des: "Displays all vocabulary information. Enter vocabulary using the keyboard",
      path: `/vocabularies/${slug}?mode=study&input=typing`,
      icon: <KeyboardAltOutlinedIcon fontSize="large" />,
    },
    {
      title: "Speaking",
      des: "Displays all vocabulary information. Listen to vocabulary sounds & repeat",
      path: `/vocabularies/${slug}?mode=study&input=speaking`,
      icon: <KeyboardVoiceOutlinedIcon fontSize="large" />,
    },
  ];

  const practiceItems = [
    {
      title: "Typing",
      des: "Hide all vocabulary information. Listen to vocabulary sounds & enter vocabulary using the keyboard",
      path: `/vocabularies/${slug}?mode=practice&input=typing`,
      icon: <KeyboardAltOutlinedIcon fontSize="large" />,
    },
    {
      title: "Speaking",
      des: "Hide all vocabulary information. Listen to vocabulary sounds & repeat",
      path: `/vocabularies/${slug}?mode=practice&input=speaking`,
      icon: <KeyboardVoiceOutlinedIcon fontSize="large" />,
    },
  ];

  const testItems = [
    {
      title: "Typing",
      des: "Hide all vocabulary information. Listen to vocabulary sounds & enter vocabulary using the keyboard. Score",
      path: `/vocabularies/${slug}?mode=test&input=typing`,
      icon: <KeyboardAltOutlinedIcon fontSize="large" />,
    },
    {
      title: "Speaking",
      des: "Hide all vocabulary information. Listen to vocabulary sounds & repeat. Score",
      path: `/vocabularies/${slug}?mode=test&input=speaking`,
      icon: <KeyboardVoiceOutlinedIcon fontSize="large" />,
    },
  ];

  if (isLoadingUnit || isLoadingGrade || isLoadingNumber) {
    return <LoadingUI />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <Button
            className={styles.buttonWrapper}
            onClick={() => router.push("/")}
            startIcon={<ArrowBackIosNewOutlinedIcon />}
          >
            Back
          </Button>

          <Box
            className={styles.titleWrapper}
            sx={{
              marginTop: {
                xs: "40px",
                sm: "0px",
              },
            }}
          >
            <h3>{grade?.title}</h3>
            <p>{unit?.title}</p>
          </Box>
        </div>
      </div>

      <div className={styles.wrapper}>
        <MenuItem title="learn" number={number} items={studyItems} />
        <MenuItem title="practice" number={number} items={practiceItems} />
        <MenuItem title="test" number={number} items={testItems} />
      </div>
    </div>
  );
};

export default MenuList;
