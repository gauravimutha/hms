import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import jwt from "jsonwebtoken";
import { DEMO_ACCOUNTS } from "@/lib/demo/demoAccounts";

export async function POST(request: Request) {
  try {
    if (process.env.NEXT_PUBLIC_DEMO_ENABLED !== "true") {
      return NextResponse.json(
        { error: "Demo mode is disabled in this environment." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { role, email } = body;

    // Match demo account from allowed demo roster
    const demoAccount = DEMO_ACCOUNTS.find(
      (a) => (role && a.role === role) || (email && a.email.toLowerCase() === email.toLowerCase())
    );

    if (!demoAccount) {
      return NextResponse.json(
        { error: "Invalid demo role or identity requested." },
        { status: 400 }
      );
    }

    // Look up user in the actual database
    const user = await prisma.user.findUnique({
      where: { email: demoAccount.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: `Demo user ${demoAccount.email} not found in database. Please run demo seed.` },
        { status: 404 }
      );
    }

    if (!user.status) {
      return NextResponse.json(
        { error: "Demo user account is inactive. Please seed or approve demo accounts." },
        { status: 403 }
      );
    }

    const secret = process.env.JWT_SECRET || "fallback_secret";

    // Generate valid signed JWT token for the demo user session
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      secret,
      { expiresIn: "8h" }
    );

    const response = NextResponse.json({
      success: true,
      token,
      role: user.role,
      name: user.name,
      email: user.email,
      landingRoute: demoAccount.landingRoute,
      message: `Signed in as ${user.name} (${user.role}) for demo session.`,
    });

    // Set the same HTTP-only cookie as regular login for middleware verification
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 8 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Demo login error:", error);
    return NextResponse.json(
      { error: "Failed to authenticate demo user." },
      { status: 500 }
    );
  }
}
