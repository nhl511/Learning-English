import { ActiveRequest } from "@/libs/models";
import { connectToDb } from "@/libs/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const userId = request.nextUrl.searchParams.get("userId");

  try {
    connectToDb();
    const activeRequest = await ActiveRequest.find({
      user: userId,
      status: "pending",
    });
    return NextResponse.json(activeRequest);
  } catch (error) {
    console.log(error);
  }
};
