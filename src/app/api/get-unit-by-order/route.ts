import { Unit } from "@/libs/models";
import { connectToDb } from "@/libs/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const gradeId = request.nextUrl.searchParams.get("gradeId");
  const order = Number(request.nextUrl.searchParams.get("order"));

  try {
    connectToDb();
    const units = await Unit.find({ gradeId })
      .select("_id")
      .skip(order)
      .limit(1);
    const unitObject = units.reduce((acc, unit) => {
      acc = unit;
      return acc;
    }, {});

    return NextResponse.json(unitObject);
  } catch (error) {
    console.log(error);
  }
};
