import { HardVocabulary } from "@/libs/models";
import { connectToDb } from "@/libs/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  //   const session = await auth();
  const userId = request.nextUrl.searchParams.get("userId");

  try {
    connectToDb();
    const number = (await HardVocabulary.find({ userId })).length;
    return NextResponse.json(number);
  } catch (error) {
    console.log(error);
  }
};
