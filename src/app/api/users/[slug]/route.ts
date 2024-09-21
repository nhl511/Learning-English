import { User } from "@/libs/models";
import { connectToDb } from "@/libs/utils";
import { NextResponse } from "next/server";

export const GET = async (request: any, { params }: any) => {
  const { slug } = params;
  try {
    connectToDb();
    const user = await User.findById(slug).populate("grade");
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
  }
};
