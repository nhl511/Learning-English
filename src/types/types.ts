import { Vocabulary } from "./../libs/models";
export type LinkType = {
  title: string;
  path: string;
  icon: any;
  icon2: any;
};

export type GradeType = {
  _id: string;
  title: string;
};

export type UnitType = {
  _id: string;
  title: string;
  gradeId: string;
};

export type VocabularyType = {
  _id: string;
  word: string;
  definition: string;
  transcription: string;
  wordType: string;
  audioLink: string;
  viAudioLink: string;
  duration: string;
  unitId: string;
};

export type UploadFileResponse<TServerOutput> = {
  name: string;
  size: number;
  key: string;
  url: string;

  // Matches what's returned from the serverside `onUploadComplete` callback
  // Will be `null` if `skipPolling` is set to `true`.
  serverdata: TServerOutput;
};
