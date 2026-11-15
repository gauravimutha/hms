import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { resetDemoDatabase } from "@/lib/demo/seedService";

// POST /api/demo/reset
export async function POST() {
  try {
    if (process.env.NEXT_PUBLIC_DEMO_ENABLED !== "true") {
      return NextResponse.json(
        { error: "Demo mode is disabled in this environment." },
        { status: 403 }
      );
    }

    const result = await resetDemoDatabase(prisma);
    return NextResponse.json({
      message: "BizLume HMS demo data has been successfully reset to default baseline state.",
      ...result,
    });
  } catch (error: any) {
    console.error("Demo reset error:", error);
    return NextResponse.json(
      { error: "Failed to reset demo dataset: " + error.message },
      { status: 500 }
    );
  }
}
