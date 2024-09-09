import { Vocabulary } from "@/libs/models";
import { connectToDb } from "@/libs/utils";
import { NextResponse } from "next/server";

export const GET = async (request: any, { params }: any) => {
  const { slug } = params;
  try {
    connectToDb();
    const number = (await Vocabulary.find({ unitId: slug })).length;
    if (number === 0) {
      return NextResponse.json(null);
    }

    return NextResponse.json(number);
  } catch (error) {
    console.log(error);
  }
};
