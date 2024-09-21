import { Prices } from "@/libs/models";
import { connectToDb } from "@/libs/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const isActive = request.nextUrl.searchParams.get("isActive");

  try {
    connectToDb();
    if (isActive) {
      const prices = await Prices.find({ isActive }).sort({ price: 1 });
      return NextResponse.json(prices);
    } else {
      const prices = await Prices.find().sort({ price: 1 });
      return NextResponse.json(prices);
    }
  } catch (error) {
    console.log(error);
  }
};
