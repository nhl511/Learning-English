"use client";

import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";

const AudioPlayer = ({
  link,
  autoPlay,
}: {
  link: string;
  autoPlay: boolean;
}) => {
  const audio = new Audio(link);

  const handlePlay = () => {
    audio.play();
  };
  useEffect(() => {
    if (autoPlay) handlePlay();
  }, [link]);

  return (
    <div className="">
      <FontAwesomeIcon
        icon={faVolumeHigh}
        style={{ color: "#ffffff", cursor: "pointer" }}
        onClick={handlePlay}
      />
    </div>
  );
};

export default AudioPlayer;
