"use client";
import React, { Suspense } from "react";
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
import Loading from "@/components/loading/Loading";

const MenuList = ({ params }: any) => {
  const { slug } = params;
  const router = useRouter();
  const { unit } = useUnitById(slug);
  const { grade } = useGradeById(unit?.gradeId);
  const { number } = useNumberOfVocabulary(unit?._id);

  const studyItems = [
    {
      title: "Typing",
      des: "Displays all vocabulary information. Enter vocabulary using the keyboard",
      path: `/${slug}?mode=study&input=typing`,
      icon: <KeyboardAltOutlinedIcon fontSize="large" />,
    },
    {
      title: "Speaking",
      des: "Displays all vocabulary information. Listen to vocabulary sounds & repeat",
      path: `/${slug}?mode=study&input=speaking`,
      icon: <KeyboardVoiceOutlinedIcon fontSize="large" />,
    },
  ];

  const practiceItems = [
    {
      title: "Typing",
      des: "Hide all vocabulary information. Listen to vocabulary sounds & enter vocabulary using the keyboard",
      path: `/${slug}?mode=practice&input=typing`,
      icon: <KeyboardAltOutlinedIcon fontSize="large" />,
    },
    {
      title: "Speaking",
      des: "Hide all vocabulary information. Listen to vocabulary sounds & repeat",
      path: `/${slug}?mode=practice&input=speaking`,
      icon: <KeyboardVoiceOutlinedIcon fontSize="large" />,
    },
  ];

  const testItems = [
    {
      title: "Typing",
      des: "Hide all vocabulary information. Listen to vocabulary sounds & enter vocabulary using the keyboard. Score",
      path: `/${slug}?mode=test&input=typing`,
      icon: <KeyboardAltOutlinedIcon fontSize="large" />,
    },
    {
      title: "Speaking",
      des: "Hide all vocabulary information. Listen to vocabulary sounds & repeat. Score",
      path: `/${slug}?mode=test&input=speaking`,
      icon: <KeyboardVoiceOutlinedIcon fontSize="large" />,
    },
  ];

  return (
    <Suspense fallback={<Loading />}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.title}>
            <div
              className={styles.buttonWrapper}
              onClick={() => router.push("/")}
            >
              <ArrowBackIosNewOutlinedIcon />
              Back
            </div>

            <div className={styles.titleWrapper}>
              <h3>{grade?.title}</h3>
              <p>{unit?.title}</p>
            </div>
          </div>
        </div>

        <div className={styles.wrapper}>
          <MenuItem title="learn" number={number} items={studyItems} />
          <MenuItem title="practice" number={number} items={practiceItems} />
          <MenuItem title="test" number={number} items={testItems} />
        </div>
      </div>
    </Suspense>
  );
};

export default MenuList;
