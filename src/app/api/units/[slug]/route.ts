import { Unit } from "@/libs/models";
import { connectToDb } from "@/libs/utils";
import { NextResponse } from "next/server";

export const GET = async (request: any, { params }: any) => {
  const { slug } = params;
  try {
    connectToDb();
    const unit = await Unit.findById(slug);
    return NextResponse.json(unit);
  } catch (error) {
    console.log(error);
  }
};
