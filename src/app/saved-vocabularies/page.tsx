"use client";
import React from "react";
import styles from "./savedVocabularies.module.css";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import MenuItem from "@/components/menuItem/MenuItem";
import KeyboardAltOutlinedIcon from "@mui/icons-material/KeyboardAltOutlined";
import KeyboardVoiceOutlinedIcon from "@mui/icons-material/KeyboardVoiceOutlined";
import {
  useNumberOfHardVocabulary,
  useSession,
} from "@/customHooks/CustomHooks";

const SavedVocabulariesPage = () => {
  const { sessionData } = useSession();
  const { number } = useNumberOfHardVocabulary(sessionData?.user?.id);
  const router = useRouter();
  const studyItems = [
    {
      title: "Typing",
      des: "Displays all vocabulary information. Enter vocabulary using the keyboard",
      path: `/saved-vocabularies/vocabularies?mode=study&input=typing`,
      icon: <KeyboardAltOutlinedIcon fontSize="large" />,
    },
    {
      title: "Speaking",
      des: "Displays all vocabulary information. Listen to vocabulary sounds & repeat",
      path: `/saved-vocabularies/vocabularies?mode=study&input=speaking`,
      icon: <KeyboardVoiceOutlinedIcon fontSize="large" />,
    },
  ];

  const practiceItems = [
    {
      title: "Typing",
      des: "Hide all vocabulary information. Listen to vocabulary sounds & enter vocabulary using the keyboard",
      path: `/saved-vocabularies/vocabularies?mode=practice&input=typing`,
      icon: <KeyboardAltOutlinedIcon fontSize="large" />,
    },
    {
      title: "Speaking",
      des: "Hide all vocabulary information. Listen to vocabulary sounds & repeat",
      path: `/saved-vocabularies/vocabularies?mode=practice&input=speaking`,
      icon: <KeyboardVoiceOutlinedIcon fontSize="large" />,
    },
  ];

  const testItems = [
    {
      title: "Typing",
      des: "Hide all vocabulary information. Listen to vocabulary sounds & enter vocabulary using the keyboard. Score",
      path: `/saved-vocabularies/vocabularies?mode=test&input=typing`,
      icon: <KeyboardAltOutlinedIcon fontSize="large" />,
    },
    {
      title: "Speaking",
      des: "Hide all vocabulary information. Listen to vocabulary sounds & repeat. Score",
      path: `/saved-vocabularies/vocabularies?mode=test&input=speaking`,
      icon: <KeyboardVoiceOutlinedIcon fontSize="large" />,
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <Box
            className={styles.titleWrapper}
            sx={{
              marginTop: {
                xs: "40px",
                sm: "0px",
              },
            }}
          >
            <h3>Your saved vocabularies</h3>
          </Box>
        </div>
      </div>

      <div className={styles.wrapper} style={{ marginTop: "40px" }}>
        {number > 0 ? (
          <>
            <MenuItem title="learn" number={number} items={studyItems} />
            <MenuItem title="practice" number={number} items={practiceItems} />
            <MenuItem title="test" number={number} items={testItems} />
          </>
        ) : (
          <div className={styles.empty}>
            <Typography variant="h5" textAlign="center">
              You don't have any saved vocabularies
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedVocabulariesPage;
