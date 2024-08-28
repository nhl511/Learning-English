"use client";
import { ReactNode, useEffect, useState } from "react";
import VoiceContext from "./VoiceContext";

interface VoiceProviderProps {
  children: ReactNode;
}
const VoiceProvider = ({ children }: VoiceProviderProps) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };
    loadVoices();
    // Load voices again if they change (some browsers don't load voices immediately)
    window.speechSynthesis.onvoiceschanged = loadVoices;

    // Clean up the event listener when the component unmounts
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  return (
    <VoiceContext.Provider value={{ voices }}>{children}</VoiceContext.Provider>
  );
};

export default VoiceProvider;
