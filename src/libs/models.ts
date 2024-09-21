import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
    },
    password: {
      type: String,
    },
    img: {
      type: String,
    },
    grade: { type: mongoose.Schema.Types.ObjectId, ref: "Grade" },

    isAdmin: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    startActiveDate: {
      type: Date,
    },
    endActiveDate: {
      type: Date,
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
    viAudioLink: {
      type: String,
    },
    duration: {
      type: Number,
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

const correctTimeSchema = new mongoose.Schema({
  vocabulary: { type: mongoose.Schema.Types.ObjectId, ref: "Vocabulary" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  writingTimes: {
    type: Number,
    default: 0,
  },
  speakingTimes: {
    type: Number,
    default: 0,
  },
});

const pricesSchema = new mongoose.Schema(
  {
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const activeRequestSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    price: { type: mongoose.Schema.Types.ObjectId, ref: "Prices" },
    status: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
    },
  },
  { timestamps: true }
);

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
export const Grade =
  mongoose.models?.Grade || mongoose.model("Grade", gradeSchema);
export const Unit = mongoose.models?.Unit || mongoose.model("Unit", unitSchema);
export const Vocabulary =
  mongoose.models?.Vocabulary || mongoose.model("Vocabulary", vocabularySchema);
export const HardVocabulary =
  mongoose.models?.HardVocabulary ||
  mongoose.model("HardVocabulary", hardVocabularySchema);
export const CorrectTime =
  mongoose.models?.CorrectTime ||
  mongoose.model("CorrectTime", correctTimeSchema);
export const Prices =
  mongoose.models?.Prices || mongoose.model("Prices", pricesSchema);
export const ActiveRequest =
  mongoose.models?.ActiveRequest ||
  mongoose.model("ActiveRequest", activeRequestSchema);
