"use server";
import { auth, signIn, signOut } from "./auth";
import {
  ActiveRequest,
  CorrectTime,
  Grade,
  HardVocabulary,
  Prices,
  Unit,
  User,
  Vocabulary,
} from "./models";
import { connectToDb } from "./utils";
import bcrypt from "bcrypt";
import moment from "moment";

// export const register = async (prevState: any, formData: any) => {
export const register = async ({ username, password, passwordRepeat }: any) => {
  // const { username, password, passwordRepeat } = Object.fromEntries(formData);
  if (username.length < 6) {
    return { error: "Username must have at least 6 characters" };
  }
  if (password.length < 6) {
    return { error: "Password must have at least 6 characters" };
  }
  if (password !== passwordRepeat) {
    return { error: "Password does not match" };
  }
  try {
    connectToDb();
    const user = await User.findOne({ username });
    if (user) {
      return { error: "Username already exist" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: hashedPassword,
    });
    await newUser.save();
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const login = async ({ username, password }: any) => {
  try {
    await signIn("credentials", { username, password });
  } catch (err: any) {
    if (err?.cause?.err?.message.includes("")) {
      return { error: "Invalid username or password" };
    }
    throw err;
  }
};

export const logout = async () => {
  await signOut();
};

export const addGrade = async (formData: any) => {
  const { title } = Object.fromEntries(formData);
  try {
    connectToDb();
    const newGrade = new Grade({
      title,
    });
    await newGrade.save();
  } catch (error) {
    console.log(error);
  }
};

export const deleteGrade = async (id: string) => {
  try {
    connectToDb();
    await Grade.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
  }
};

export const updateGrade = async (formData: any) => {
  const { id, title } = Object.fromEntries(formData);

  try {
    connectToDb();
    const updateData = {
      title,
    };
    await Grade.findByIdAndUpdate(id, updateData, { new: true });
  } catch (error) {
    console.log(error);
  }
};

export const addUnit = async (formData: any) => {
  const { gradeId } = Object.fromEntries(formData);
  try {
    connectToDb();
    const unit = (await Unit.find({ gradeId })).length + 1;
    const newUnit = new Unit({
      title: "Unit " + unit,
      gradeId,
    });
    await newUnit.save();
  } catch (error) {
    console.log(error);
  }
};

export const deleteUnit = async (id: string) => {
  try {
    connectToDb();
    await Unit.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
  }
};

export const addVocabulary = async (formData: any) => {
  const { word, definition, transcription, wordType, unitId } =
    Object.fromEntries(formData);
  try {
    connectToDb();
    const newVocabulary = new Vocabulary({
      word,
      definition,
      transcription,
      wordType,
      unitId,
    });
    await newVocabulary.save();
  } catch (error) {
    console.log(error);
  }
};

export const addVocabularies = async (vocabularies: any) => {
  try {
    connectToDb();
    await Vocabulary.insertMany(vocabularies);
  } catch (error) {
    console.log(error);
  }
};

export const deleteVocabulary = async (id: string) => {
  try {
    connectToDb();
    await Vocabulary.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
  }
};

export const updateVocabulary = async (formData: any) => {
  const { id, word, definition, transcription, wordType, unitId } =
    Object.fromEntries(formData);

  try {
    connectToDb();
    const updateData = {
      word,
      definition,
      transcription,
      wordType,
      unitId,
    };
    await Vocabulary.findByIdAndUpdate(id, updateData, { new: true });
  } catch (error) {
    console.log(error);
  }
};

export const addHardVocabulary = async (id: string) => {
  const session = await auth();

  try {
    connectToDb();
    const newHardVocabulary = new HardVocabulary({
      vocabularyId: id,
      userId: session?.user?.id,
    });
    await newHardVocabulary.save();
  } catch (error) {
    console.log(error);
  }
};

export const deleteHardVocabulary = async (id: string) => {
  const session = await auth();

  try {
    connectToDb();
    await HardVocabulary.findOneAndDelete({
      vocabularyId: id,
      userId: session?.user?.id,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateGradeForUser = async (gradeId: string) => {
  const session = await auth();
  if (session?.user?.id) {
    try {
      connectToDb();
      const updateData = {
        grade: gradeId,
      };
      const options = { new: true, upsert: true }; // Use upsert: true to insert a new document if not found

      await User.findByIdAndUpdate(session?.user?.id, updateData, options);
    } catch (error) {
      console.log(error);
    }
  }
};

export const checkPassword = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    connectToDb();
    const user = await User.findOne({ username });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) return { error: "Password not correct" };

    return { success: true };
  } catch (error) {
    console.log(error);
  }
};

export const changePassword = async ({
  userId,
  newPassword,
}: {
  userId: string;
  newPassword: string;
}) => {
  try {
    connectToDb();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    const updateData = {
      password: hashedPassword,
    };
    await User.findByIdAndUpdate(userId, updateData);
  } catch (error) {
    console.log(error);
  }
};

export const updateWritingTimes = async (vocabId: string) => {
  const session = await auth();

  try {
    connectToDb();

    await CorrectTime.updateOne(
      { vocabulary: vocabId, user: session?.user?.id },
      { $inc: { writingTimes: 1 } },
      { upsert: true }
    );
  } catch (error) {
    console.log(error);
  }
};

export const updateSpeakingTimes = async (vocabId: string) => {
  const session = await auth();

  try {
    connectToDb();

    await CorrectTime.updateOne(
      { vocabulary: vocabId, user: session?.user?.id },
      { $inc: { speakingTimes: 1 } },
      { upsert: true }
    );
  } catch (error) {
    console.log(error);
  }
};

export const handleGoogleLogin = async () => {
  await signIn("google");
};

export const activeUser = async (userId: string, isAdmin: boolean) => {
  try {
    connectToDb();
    const today = moment().locale("vi");

    if (isAdmin) {
      await User.findByIdAndUpdate(userId, {
        isActive: true,
      });
    } else {
      const endDate = today.clone().add(1, "year");
      await User.findByIdAndUpdate(userId, {
        isActive: true,
        startActiveDate: today.toISOString(),
        endActiveDate: endDate.toISOString(),
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const disableUser = async (userId: string) => {
  try {
    connectToDb();
    await User.findByIdAndUpdate(userId, {
      isActive: false,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addPrice = async (formData: any) => {
  const { duration, price } = Object.fromEntries(formData);

  try {
    connectToDb();
    const newPrice = new Prices({
      price: price,
      duration: duration,
    });
    await newPrice.save();
  } catch (error) {}
};

export const handlePrice = async (priceId: string, isActive: boolean) => {
  try {
    connectToDb();

    await Prices.findByIdAndUpdate(priceId, {
      isActive: isActive,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createActiveRequest = async ({
  userId,
  priceId,
  phone,
}: {
  userId: string;
  priceId: string;
  phone: string;
}) => {
  try {
    connectToDb();
    const newRequest = new ActiveRequest({
      user: userId,
      price: priceId,
      status: "pending",
      phone,
    });
    await newRequest.save();
  } catch (error) {
    console.log(error);
  }
};

export const comfirmRequest = async ({
  requestId,
  userId,
  duration,
}: {
  requestId: string;
  userId: string;
  duration: number;
}) => {
  try {
    connectToDb();
    const today = moment().locale("vi");

    await ActiveRequest.findByIdAndUpdate(requestId, {
      status: "confirmed",
    });

    const endDate = today.clone().add(duration, "month");
    await User.findByIdAndUpdate(userId, {
      isActive: true,
      startActiveDate: today.toISOString(),
      endActiveDate: endDate.toISOString(),
    });
  } catch (error) {
    console.log(error);
  }
};

export const cancelRequest = async (requestId: string) => {
  try {
    connectToDb();
    await ActiveRequest.findByIdAndUpdate(requestId, {
      status: "canceled",
    });
  } catch (error) {
    console.log(error);
  }
};
