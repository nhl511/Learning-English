"use client";
import { ReactNode, useEffect, useState } from "react";
import VoiceContext from "./VoiceContext";

interface VoiceProviderProps {
  children: ReactNode;
}
const VoiceProvider = ({ children }: VoiceProviderProps) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [enVoiceIndex, setEnVoiceIndex] = useState<any>(null);
  const [viVoiceIndex, setViVoiceIndex] = useState<any>(null);

  useEffect(() => {
    if (voices) {
      //   setEnVoiceIndex(
      //     voices.findIndex((voice: any) => voice.lang === "en-US") - 1
      //   );
      //   setEnVoiceIndex(0);
      //   setViVoiceIndex(voices.findIndex((voice: any) => voice.lang === "vi-VN"));

      const filteredEnVoices = voices.filter(
        (voice: any) => voice.lang === "en-US"
      );
      const filteredViVoices = voices.filter(
        (voice: any) => voice.lang === "vi-VN"
      );

      const firstEnVoiceIndex = voices.indexOf(filteredEnVoices[0]);

      const firstViVoiceIndex = voices.indexOf(filteredViVoices[0]);
      setEnVoiceIndex(firstEnVoiceIndex);
      setViVoiceIndex(firstViVoiceIndex);
    }
  }, [voices]);

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
    <VoiceContext.Provider
      value={{
        voices,
        enVoiceIndex,
        setEnVoiceIndex,
        viVoiceIndex,
        setViVoiceIndex,
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
};

export default VoiceProvider;
