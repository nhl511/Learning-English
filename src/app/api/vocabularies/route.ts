import { Vocabulary } from "@/libs/models";
import { connectToDb } from "@/libs/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const unitId = request.nextUrl.searchParams.get("unitId");

  try {
    connectToDb();
    const vocabularies = await Vocabulary.find({ unitId });
    return NextResponse.json(vocabularies);
  } catch (error) {
    console.log(error);
  }
};
