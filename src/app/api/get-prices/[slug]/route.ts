import { Prices } from "@/libs/models";
import { connectToDb } from "@/libs/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params }: any) => {
  const { slug } = params;
  try {
    connectToDb();
    const prices = await Prices.findById(slug);
    return NextResponse.json(prices);
  } catch (error) {
    console.log(error);
  }
};
