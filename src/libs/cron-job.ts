import moment from "moment";
import { connectToDb } from "./utils";
import { User } from "./models";

export const setupCronJob = async () => {
  console.log("Cron job started: Checking user expiration dates");

  try {
    // Ensure database connection
    await connectToDb();

    const today = moment().locale("vi").startOf("day").toDate(); // Get today's date

    // Find users whose endActiveDate is today or earlier and are still active
    const usersToDeactivate = await User.find({
      endActiveDate: { $lte: today },
      isActive: true,
    });

    // Deactivate those users
    if (usersToDeactivate.length > 0) {
      for (const user of usersToDeactivate) {
        await User.findByIdAndUpdate(user._id, { isActive: false });
        console.log(`Deactivated user: ${user.username}`);
      }
    } else {
      console.log("No users to deactivate today.");
    }
  } catch (error) {
    console.error("Error in cron job:", error);
  }
};
