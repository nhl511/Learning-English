import { CorrectTime, Vocabulary } from "@/libs/models";
import { connectToDb } from "@/libs/utils";
import { NextResponse } from "next/server";

export const GET = async (request: any, { params }: any) => {
  const userId = request.nextUrl.searchParams.get("userId");
  const unitId = request.nextUrl.searchParams.get("unitId");
  const type = request.nextUrl.searchParams.get("type");

  try {
    await connectToDb();

    // Fetch all vocabularies for the given unitId
    const vocabularies = await Vocabulary.find({ unitId });

    // Enrich each vocabulary with its corresponding correctTime
    const enrichedVocabulary = await Promise.all(
      vocabularies.map(async (vocab: any) => {
        let correctTime;

        // Depending on the type (writing or speaking), fetch the correctTime
        if (type === "writing") {
          correctTime = await CorrectTime.findOne({
            vocabulary: vocab._id,
            writingTimes: { $gt: 0 },
            user: userId,
          });
        } else {
          correctTime = await CorrectTime.findOne({
            vocabulary: vocab._id,
            speakingTimes: { $gt: 0 },
            user: userId,
          });
        }

        // Return the vocabulary enriched with correctTime (or null if none found)
        return {
          ...vocab.toObject(),
          correctTime: correctTime || null, // Include the correctTime if it exists, otherwise null
        };
      })
    );

    // Filter out the vocabularies where correctTime is null
    const filteredResults = enrichedVocabulary.filter(
      (vocab) => vocab.correctTime !== null
    );

    // Count how many items with non-null correctTime were found
    const count = filteredResults.length;
    // Return the enriched vocabularies and the count
    return NextResponse.json({ count, data: enrichedVocabulary });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
};
