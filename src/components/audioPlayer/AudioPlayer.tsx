"use client";

import VoiceContext from "@/contexts/VoiceContext";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";

interface AudioPlayerProps {
  word: string;
  autoPlay: boolean;
  lang?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ word, autoPlay, lang }) => {
  const context = useContext(VoiceContext);

  const { voices } = context;
  const handlePlay = () => {
    // Cancel any ongoing speech synthesis
    window.speechSynthesis.cancel();

    // Create a new SpeechSynthesisUtterance instance
    const utterance = new SpeechSynthesisUtterance(word);
    if (lang === "en") {
      utterance.voice = voices.find((voice: any) => voice.name === "Samantha");
    } else {
      utterance.voice = voices.find((voice: any) => voice.name === "Linh");
    }

    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (autoPlay && word) {
      handlePlay();
    }

    // Cleanup function to cancel speech synthesis when component unmounts or dependencies change
    return () => {
      window.speechSynthesis.cancel();
    };
  }, [word, autoPlay]);

  return (
    <div>
      <FontAwesomeIcon
        icon={faVolumeHigh}
        style={{ color: "black", cursor: "pointer" }}
        onClick={handlePlay}
      />
    </div>
  );
};

export default AudioPlayer;
