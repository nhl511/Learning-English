import { Vocabulary } from "@/libs/models";
import { connectToDb } from "@/libs/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const unitId = request.nextUrl.searchParams.get("unitId");
  const page = Number(request.nextUrl.searchParams.get("page"));

  try {
    connectToDb();
    const vocabularies = await Vocabulary.find({ unitId }).skip(page).limit(1);
    // return NextResponse.json(vocabularies);
    const vocabulariesObject = vocabularies.reduce((acc, vocab) => {
      acc = vocab;
      return acc;
    }, {});

    return NextResponse.json(vocabulariesObject);
  } catch (error) {
    console.log(error);
  }
};
