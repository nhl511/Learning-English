import { Grade } from "@/libs/models";
import { connectToDb } from "@/libs/utils";
import { NextResponse } from "next/server";

export const GET = async (request: any, { params }: any) => {
  const { slug } = params;
  try {
    connectToDb();
    const grade = await Grade.findById(slug);
    return NextResponse.json(grade);
  } catch (error) {
    console.log(error);
  }
};
