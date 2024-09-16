import { User } from "@/libs/models";
import { connectToDb } from "@/libs/utils";
import { NextResponse } from "next/server";

export const GET = async (request: any, { params }: any) => {
  try {
    connectToDb();
    const user = await User.find();
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
  }
};
