import { Vocabulary } from "@/libs/models";
import { connectToDb } from "@/libs/utils";
import { NextResponse } from "next/server";

export const GET = async (request: any, { params }: any) => {
  const { slug } = params;
  try {
    connectToDb();
    const vocabulary = await Vocabulary.findById(slug);
    return NextResponse.json(vocabulary);
  } catch (error) {
    console.log(error);
  }
};
