"use client";

import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef } from "react";

const AudioPlayer = ({
  link,
  autoPlay,
  onAudioEnd,
}: {
  link: string;
  autoPlay: boolean;
  onAudioEnd?: () => void;
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = () => {
    if (audioRef.current) {
      // Pause the currently playing audio if any
      audioRef.current.pause();
    }

    // Create a new audio instance and assign it to the ref
    const newAudio = new Audio(link);
    audioRef.current = newAudio;

    newAudio.addEventListener("ended", () => {
      if (onAudioEnd) onAudioEnd(); // Trigger the callback if provided
    });

    newAudio.play();
  };

  useEffect(() => {
    if (autoPlay) handlePlay();

    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [link, autoPlay]);

  return (
    <div className="">
      <FontAwesomeIcon
        icon={faVolumeHigh}
        style={{ color: "black", cursor: "pointer" }}
        onClick={handlePlay}
      />
    </div>
  );
};

export default AudioPlayer;
