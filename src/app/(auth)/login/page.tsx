"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ShapeGrid from "@/components/ShapeGrid";
import { isDemoEnabled } from "@/lib/demo/demoConfig";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      // Store auth data in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("name", data.name);

      // Redirect based on the role returned by the server
      switch (data.role) {
        case "ADMIN":
          router.push("/admin-dashboard");
          break;
        case "DOCTOR":
          router.push("/doctor-dashboard");
          break;
        case "NURSE":
          router.push("/vitals");
          break;
        case "RECEPTIONIST":
          router.push("/registeration");
          break;
        case "PHARMACIST":
          router.push("/pharmacy-dashboard");
          break;
        case "LAB_TECHNICIAN":
          router.push("/lab-dashboard");
          break;
        default:
          setError("Role not recognized.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 overflow-hidden bg-navy">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <ShapeGrid
          shape="circle"
          speed={0.5}
          squareSize={40}
          borderColor="rgba(230, 244, 248, 0.15)"
          hoverFillColor="#00b4d8"
          backgroundColor="#0a1d30"
          hoverTrailAmount={5}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/95 backdrop-blur-2xl rounded-3xl shadow-[0_0_40px_rgba(0,180,216,0.15)] border border-cyan/30 overflow-hidden z-10"
      >
        <div className="bg-navy p-6 sm:p-8 text-center relative overflow-hidden flex flex-col items-center">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan/10 rounded-full blur-3xl" />
          <Link href="/" className="mb-3 hover:scale-105 transition-transform inline-block">
            <Image
              src="/logo-icon.png"
              alt="BizLume Logo"
              width={52}
              height={52}
              className="w-13 h-13 object-contain"
              priority
            />
          </Link>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            BizLume <span className="text-cyan">HMS</span>
          </h2>
          <p className="text-soft-blue/60 text-xs mt-1.5 uppercase tracking-widest font-medium">
            Healthcare Operating System
          </p>
        </div>

        <form onSubmit={handleLogin} className="p-5 sm:p-8 space-y-5 sm:space-y-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-grey uppercase ml-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="doctor@bizlume.com"
                className="w-full p-3 bg-light-grey border border-soft-blue rounded-xl outline-none focus:ring-2 focus:ring-cyan transition-all text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-grey uppercase ml-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3 bg-light-grey border border-soft-blue rounded-xl outline-none focus:ring-2 focus:ring-cyan transition-all text-sm"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 text-red-600 text-xs font-bold px-4 py-3 rounded-xl text-center"
            >
              {error}
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-navy text-white py-3.5 sm:py-4 rounded-xl font-bold shadow-lg shadow-navy/20 hover:bg-cyan hover:text-navy transition-all disabled:opacity-50 text-sm sm:text-base"
          >
            {loading ? "Authenticating..." : "Sign In to Portal"}
          </motion.button>

          {/* Quick Demo Autofill Bar (Only shown if demo mode enabled in env) */}
          {isDemoEnabled() && (
            <div className="pt-2 border-t border-soft-blue/60">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-navy flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse"></span>
                  Autofill Demo Credentials
                </span>
                <Link href="/demo" className="text-[11px] font-bold text-cyan hover:underline">
                  Guided Tour →
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                <button
                  type="button"
                  onClick={() => {
                    setEmail("receptionist.demo@bizlume.in");
                    setPassword("DemoPassword@2026");
                  }}
                  className="p-1.5 bg-light-grey hover:bg-cyan/15 rounded-lg text-dark font-medium border border-soft-blue truncate"
                  title="Receptionist: Ananya Desai"
                >
                  Receptionist
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEmail("nurse.demo@bizlume.in");
                    setPassword("DemoPassword@2026");
                  }}
                  className="p-1.5 bg-light-grey hover:bg-cyan/15 rounded-lg text-dark font-medium border border-soft-blue truncate"
                  title="Nurse: Priya Sharma"
                >
                  Nurse
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEmail("doctor.demo@bizlume.in");
                    setPassword("DemoPassword@2026");
                  }}
                  className="p-1.5 bg-light-grey hover:bg-cyan/15 rounded-lg text-dark font-medium border border-soft-blue truncate"
                  title="Doctor: Dr. Aarav Mehta"
                >
                  Doctor
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEmail("lab.demo@bizlume.in");
                    setPassword("DemoPassword@2026");
                  }}
                  className="p-1.5 bg-light-grey hover:bg-cyan/15 rounded-lg text-dark font-medium border border-soft-blue truncate"
                  title="Lab Tech: Rahul Verma"
                >
                  Lab Tech
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEmail("pharmacy.demo@bizlume.in");
                    setPassword("DemoPassword@2026");
                  }}
                  className="p-1.5 bg-light-grey hover:bg-cyan/15 rounded-lg text-dark font-medium border border-soft-blue truncate"
                  title="Pharmacist: Neha Kapoor"
                >
                  Pharmacist
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEmail("admin.demo@bizlume.in");
                    setPassword("DemoPassword@2026");
                  }}
                  className="p-1.5 bg-light-grey hover:bg-cyan/15 rounded-lg text-dark font-medium border border-soft-blue truncate"
                  title="Admin: Hospital Administrator"
                >
                  Admin
                </button>
              </div>
            </div>
          )}

          <p className="text-center text-sm text-grey">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-cyan font-bold hover:underline">
              Request Access
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}