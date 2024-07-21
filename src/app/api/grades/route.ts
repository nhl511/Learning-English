import { Grade } from "@/libs/models";
import { connectToDb } from "@/libs/utils";
import { NextResponse } from "next/server";

export const revalidate = 0;

export const GET = async () => {
  try {
    connectToDb();
    const grades = await Grade.find();
    return NextResponse.json(grades);
  } catch (error) {
    console.error("Error fetching grades:", error);
  }
};
