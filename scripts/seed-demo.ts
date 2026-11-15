import "dotenv/config";
import prisma from "../src/lib/db";
import { resetDemoDatabase } from "../src/lib/demo/seedService";

async function main() {
  console.log("==========================================");
  console.log("  BIZLUME HMS — INTERACTIVE DEMO SEEDER   ");
  console.log("==========================================");

  try {
    const result = await resetDemoDatabase(prisma);
    console.log("✨ Seed successfully finished:", result);
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  }
}

main();
