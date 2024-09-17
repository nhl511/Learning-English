import { auth } from "@/libs/auth";
import { CorrectTime } from "@/libs/models";
import { connectToDb } from "@/libs/utils";
import { NextResponse } from "next/server";

export const GET = async (request: any, { params }: any) => {
  const vocabId = request.nextUrl.searchParams.get("vocabId");
  const userId = request.nextUrl.searchParams.get("userId");

  try {
    connectToDb();
    const correctTime = await CorrectTime.find({
      vocabulary: vocabId,
      user: userId,
    });
    return NextResponse.json(correctTime);
  } catch (error) {
    console.log(error);
  }
};
