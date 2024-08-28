import { createContext } from "react";

interface VoiceContextType {
  voices: any;
  setVoices: any;
}
const VoiceContext = createContext<any>(undefined);

export default VoiceContext;
