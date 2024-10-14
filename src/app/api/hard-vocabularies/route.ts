import { HardVocabulary } from "@/libs/models";
import { connectToDb } from "@/libs/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  //   const session = await auth();
  const userId = request.nextUrl.searchParams.get("userId");
  const page = Number(request.nextUrl.searchParams.get("page"));

  try {
    connectToDb();
    const hardVocabularies = await HardVocabulary.find({
      user: userId,
    })
      .populate("vocabulary")
      .skip(page)
      .limit(1);
    const vocabulariesObject = hardVocabularies.reduce((acc, vocab) => {
      acc = vocab;
      return acc;
    }, {});
    return NextResponse.json(vocabulariesObject);
  } catch (error) {
    console.log(error);
  }
};
