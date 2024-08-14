import { Grade, Unit, User } from "./models";
import { connectToDb } from "./utils";

export const getUsers = async () => {
  try {
    connectToDb();
    const users = await User.find();
    return users;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch users");
  }
};

export const getGrades = async () => {
  try {
    connectToDb();
    const grades = await Grade.find();
    return grades;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch grades");
  }
};

export const getNumberOfUnitByGradeId = async (gradeId: string) => {
  try {
    connectToDb();
    const number = (await Unit.find({ gradeId })).length;
    return number;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch number");
  }
};

export const types = [
  "Noun",
  "Verb",
  "Adjective",
  "Adverb",
  "Preposition",
  "Conjunction",
  "Interjection",
  "Pronoun",
  "Determiner",
  "Sentence",
];

export const getUnitById = async (unitId: string) => {
  try {
    connectToDb();
    const unit = await Unit.findById(unitId);
    const grade = await Grade.findById(unit.gradeId);
    return { unit, grade };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch unit");
  }
};
