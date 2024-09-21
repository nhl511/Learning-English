import { ActiveRequest } from "@/libs/models";
import { connectToDb } from "@/libs/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const status = request.nextUrl.searchParams.get("status");

  try {
    connectToDb();
    if (status) {
      const activeRequests = await ActiveRequest.find({ status })
        .populate("user")
        .populate("price");
      return NextResponse.json(activeRequests);
    } else {
      const activeRequests = await ActiveRequest.find()
        .populate("user")
        .populate("price");
      return NextResponse.json(activeRequests);
    }
  } catch (error) {
    console.log(error);
  }
};
