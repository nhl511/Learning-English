"use client";

import VoiceContext from "@/contexts/VoiceContext";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect } from "react";
import styles from "./audioPlayer.module.css";

interface AudioPlayerProps {
  word: string;
  autoPlay: boolean;
  lang?: string;
  onAudioEnd?: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  word,
  autoPlay,
  lang,
  onAudioEnd,
}) => {
  const context = useContext(VoiceContext);

  const {
    voices,
    enVoiceIndex,
    setEnVoiceIndex,
    viVoiceIndex,
    setViVoiceIndex,
  } = context;

  const handlePlay = () => {
    // Cancel any ongoing speech synthesis
    window.speechSynthesis.cancel();

    // Create a new SpeechSynthesisUtterance instance
    const utterance = new SpeechSynthesisUtterance(word);
    if (lang === "en") {
      utterance.voice = voices[enVoiceIndex];
    } else {
      utterance.voice = voices[viVoiceIndex];
    }

    if (onAudioEnd) {
      utterance.onend = onAudioEnd;
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
    <div className={styles.audioContainer}>
      {lang === "en" ? (
        <select
          value={enVoiceIndex}
          onChange={(e) => setEnVoiceIndex(e.target.value)}
        >
          {voices
            .map((voice: any, index: number) => ({
              voice,
              originalIndex: index,
            }))
            .filter(({ voice }: any) => /en.US/.test(voice.lang))
            .map(({ voice, originalIndex }: any) => (
              <option key={voice.name} value={originalIndex}>
                {voice.name}
              </option>
            ))}
        </select>
      ) : (
        <select
          value={viVoiceIndex}
          onChange={(e) => setViVoiceIndex(e.target.value)}
        >
          {voices
            .map((voice: any, index: number) => ({
              voice,
              originalIndex: index,
            }))
            .filter(({ voice }: any) => /vi.VN/.test(voice.lang))
            .map(({ voice, originalIndex }: any) => (
              <option key={voice.name} value={originalIndex}>
                {voice.name}
              </option>
            ))}
        </select>
      )}

      <FontAwesomeIcon
        icon={faVolumeHigh}
        style={{ color: "black", cursor: "pointer" }}
        onClick={handlePlay}
      />
    </div>
  );
};

export default AudioPlayer;
