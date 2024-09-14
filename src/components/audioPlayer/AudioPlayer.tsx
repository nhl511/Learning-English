"use client";

import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import styles from "./audioPlayer.module.css";
import { useTTS } from "@/customHooks/CustomHooks";

interface AudioPlayerProps {
  word: string;
  autoPlay: boolean;
  lang?: string;
  onAudioEnd?: () => void;
}

const AudioPlayer = ({
  word,
  autoPlay,
  lang,
  onAudioEnd,
}: {
  word: string;
  autoPlay: boolean;
  lang: string;
  onAudioEnd?: any;
}) => {
  const { speech, isLoadingSpeech, errorSpeech } = useTTS({
    text: word,
    languageCode: lang,
    name: `${lang}-Standard-A`,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = async () => {
    if (speech && !isPlaying) {
      const audio = new Audio(speech);
      audioRef.current = audio;

      audio.onended = () => {
        setIsPlaying(false);
        if (onAudioEnd) onAudioEnd();
      };

      audio.onerror = (e) => {
        console.error("Audio playback error:", e);
        setIsPlaying(false);
      };

      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        console.error("Error playing audio:", err);
      }
    }
  };

  useEffect(() => {
    if (autoPlay && speech) {
      handlePlay();
    }
  }, [speech, autoPlay]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <div className={styles.audioContainer}>
      <FontAwesomeIcon
        icon={faVolumeHigh}
        style={{ cursor: "pointer", color: isPlaying ? "#1479f4" : "black" }}
        onClick={handlePlay}
      />
      {isLoadingSpeech && <p>Loading...</p>}
      {errorSpeech && (
        <p>Error: {errorSpeech.message || "Something went wrong"}</p>
      )}
    </div>
  );
};

export default AudioPlayer;
