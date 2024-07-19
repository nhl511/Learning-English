import { Grade } from "@/libs/models";
import { connectToDb } from "@/libs/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    await connectToDb(); // Ensure this is awaited
    const grades = await Grade.find();

    // Create a response and set cache headers to prevent caching
    const response = NextResponse.json(grades);
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    response.headers.set("Surrogate-Control", "no-store");

    return response;
  } catch (error) {
    console.error("Error fetching grades:", error);
    return NextResponse.json(
      { message: "Failed to fetch grades" },
      { status: 500 }
    );
  }
};
