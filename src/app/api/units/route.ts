import { Unit } from "@/libs/models";
import { connectToDb } from "@/libs/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const gradeId = request.nextUrl.searchParams.get("gradeId");
  try {
    connectToDb();
    const units = await Unit.find({ gradeId });
    return NextResponse.json(units);
  } catch (error) {
    console.log(error);
  }
};
