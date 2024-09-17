import cron from "node-cron";
import moment from "moment";
import { connectToDb } from "@/libs/utils";
import { User } from "@/libs/models";
import { NextResponse } from "next/server";

export async function GET() {
  // Ensure the database is connected
  connectToDb();

  // Schedule the cron job (runs every day at midnight)
  cron.schedule("0 0 * * *", async () => {
    try {
      const today = moment().startOf("day");

      // Find users with an endActiveDate that has passed
      const users = await User.find({
        endActiveDate: { $lte: today.toDate() },
        isActive: true, // Only deactivate users who are still active
      });

      if (users.length > 0) {
        for (let user of users) {
          await User.findByIdAndUpdate(user._id, { isActive: false });
        }
      } else {
      }
    } catch (error) {
      console.log("Error checking endActiveDate:", error);
    }
  });

  return NextResponse.json({ message: "Cron job initialized" });
}
