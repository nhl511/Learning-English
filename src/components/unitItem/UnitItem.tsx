"use client";
import React from "react";
import styles from "./unitItem.module.css";
import { UnitType } from "@/types/types";
import { useNumberOfVocabulary } from "@/customHooks/CustomHooks";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";

const UnitItem = ({ unit }: { unit: UnitType }) => {
  const { number, isLoadingNumber } = useNumberOfVocabulary(unit._id);
  const router = useRouter();
  const handleClick = () => {
    if (number) {
      router.push(`/menu-list/${unit._id}`);
    } else {
      toast.info("Comming soon!");
    }
  };
  if (isLoadingNumber) return null;
  return (
    <Card
      sx={{ padding: 2 }}
      variant="outlined"
      className={styles.container}
      onClick={handleClick}
    >
      <CardContent>
        <Typography variant="h4" gutterBottom textAlign="center">
          {unit.title}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            lineClamp: 2,
            textOverflow: "ellipsis",
            height: "50px",
          }}
        >
          {unit.description ? unit.description : ""}
        </Typography>
      </CardContent>
      <CardActions>
        <Chip
          variant="outlined"
          label={number ? `${number} vocabularies` : `Comming soon`}
          color="primary"
          size="small"
          className={styles.vocabNumber}
        />
      </CardActions>
    </Card>
  );
};

export default UnitItem;
