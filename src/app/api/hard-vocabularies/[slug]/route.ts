import { auth } from "@/libs/auth";
import { HardVocabulary } from "@/libs/models";
import { connectToDb } from "@/libs/utils";
import { NextResponse } from "next/server";

export const GET = async (request: any, { params }: any) => {
  const { slug } = params;
  const session = await auth();
  try {
    connectToDb();
    const hardVocabulary = await HardVocabulary.find({
      vocabularyId: slug,
      userId: session?.user?.id,
    });
    if (hardVocabulary.length) {
      return NextResponse.json(true);
    }
    return NextResponse.json(false);
  } catch (error) {
    console.log(error);
  }
};
