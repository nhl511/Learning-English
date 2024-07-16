import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    gradeId: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const gradeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const unitSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    gradeId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const vocabularySchema = new mongoose.Schema(
  {
    word: {
      type: String,
      required: true,
    },
    definition: {
      type: String,
      required: true,
    },
    transcription: {
      type: String,
      required: true,
    },
    wordType: {
      type: String,
      required: true,
    },
    audioLink: {
      type: String,
    },
    unitId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const hardVocabularySchema = new mongoose.Schema({
  vocabularyId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
export const Grade =
  mongoose.models?.Grade || mongoose.model("Grade", gradeSchema);
export const Unit = mongoose.models?.Unit || mongoose.model("Unit", unitSchema);
export const Vocabulary =
  mongoose.models?.Vocabulary || mongoose.model("Vocabulary", vocabularySchema);
export const HardVocabulary =
  mongoose.models?.HardVocabulary ||
  mongoose.model("HardVocabulary", hardVocabularySchema);
