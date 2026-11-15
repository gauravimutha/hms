import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Protected route groups and their required roles
const protectedRoutes: Record<string, string[]> = {
    "/admin-dashboard": ["ADMIN"],
    "/reports": ["ADMIN"],
    "/doctor-dashboard": ["DOCTOR"],
    "/emr": ["DOCTOR"],
    "/doctor-profile": ["DOCTOR"],
    "/nurse-dashboard": ["NURSE"],
    "/vitals": ["NURSE"],
    "/triage": ["NURSE"],
    "/registeration": ["RECEPTIONIST"],
    "/appointments": ["RECEPTIONIST"],
    "/queue": ["RECEPTIONIST"],
    "/billings": ["RECEPTIONIST"],
    "/pharmacy-dashboard": ["PHARMACIST"],
    "/inventory": ["PHARMACIST"],
    "/prescriptions": ["PHARMACIST"],
    "/dispense": ["PHARMACIST"],
    "/prescriptionreports": ["PHARMACIST"],
    "/lab-dashboard": ["LAB_TECHNICIAN"],
    "/lab-inventory": ["LAB_TECHNICIAN"],
    "/lab-test": ["LAB_TECHNICIAN"],
};

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if the path matches any protected route
    const matchedRoute = Object.keys(protectedRoutes).find((route) =>
        pathname.startsWith(route)
    );

    if (!matchedRoute) {
        return NextResponse.next();
    }

    // Get the token from the cookie
    const token = request.cookies.get("token")?.value;

    if (!token) {
        // No token — redirect to login
        return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
        const secret = new TextEncoder().encode(
            process.env.JWT_SECRET || "fallback_secret"
        );
        const { payload } = await jwtVerify(token, secret);

        const userRole = payload.role as string;
        const allowedRoles = protectedRoutes[matchedRoute];

        // Check if the user's role is allowed for this route
        if (!allowedRoles.includes(userRole)) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        return NextResponse.next();
    } catch {
        // Invalid or expired token — redirect to login
        return NextResponse.redirect(new URL("/login", request.url));
    }
}

export const config = {
    matcher: [
        "/admin-dashboard/:path*",
        "/reports/:path*",
        "/doctor-dashboard/:path*",
        "/emr/:path*",
        "/doctor-profile/:path*",
        "/nurse-dashboard/:path*",
        "/vitals/:path*",
        "/triage/:path*",
        "/registeration/:path*",
        "/appointments/:path*",
        "/queue/:path*",
        "/billings/:path*",
        "/inventory/:path*",
        "/pharmacy-dashboard/:path*",
        "/prescriptions/:path*",
        "/dispense/:path*",
        "/prescriptionreports/:path*",
        "/lab-dashboard/:path*",
        "/lab-inventory/:path*",
        "/lab-test/:path*",
    ],
};
