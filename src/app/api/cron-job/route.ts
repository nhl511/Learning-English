import { NextResponse } from "next/server";
import { setupCronJob } from "@/libs/cron-job";

// Initialize the cron job when this API is called
export async function GET() {
  // Start the cron job (you may want to conditionally start this, or limit it based on deployment environment)
  setupCronJob();

  return NextResponse.json({ message: "Cron job initialized" });
}
