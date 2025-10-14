"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Timer } from "lucide-react";

export default function OTPVerificationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError(""); // Clear error on input

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, index) => {
      if (index < 6) newOtp[index] = char;
    });
    setOtp(newOtp);

    // Focus the next empty input or the last one
    const nextEmpty = newOtp.findIndex((digit) => !digit);
    const focusIndex = nextEmpty === -1 ? 5 : nextEmpty;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleResend = async () => {
    if (!canResend) return;

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setTimer(30);
        setCanResend(false);
        setOtp(["", "", "", "", "", ""]);
        setError("");
        inputRefs.current[0]?.focus();
      } else {
        setError("Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const otpCode = otp.join("");
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpCode }),
      });

      if (response.ok) {
        router.push(`/reset-password?email=${encodeURIComponent(email)}`);
      } else {
        setError("Invalid OTP. Please try again.");
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[440px] space-y-8">
      <div className="space-y-2">
        <h2 className="text-[32px] font-semibold text-white leading-[1.5]">
          Enter OTP
        </h2>
        <p className="text-base font-normal text-gray-400">
          Enter the OTP that we have sent to your email address{" "}
          <span className="text-white">{email}</span>.
        </p>
        <button
          onClick={() => router.push("/forgot-password")}
          className="text-sm text-purple-primary hover:text-purple-hover font-normal"
        >
          Change Email Address
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex gap-3 justify-between" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`w-14 h-14 text-center text-2xl bg-[#1E1F26] border ${
                error ? "border-red-500" : "border-[#2C2D33]"
              } rounded-lg text-white font-semibold focus:outline-none focus:ring-1 focus:ring-purple-primary focus:border-purple-primary transition-all`}
            />
          ))}
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-400 text-sm">
            <span className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">
              !
            </span>
            {error}
          </div>
        )}

        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <Timer size={16} />
          <span>{timer} Sec</span>
        </div>

        {canResend && (
          <button
            type="button"
            onClick={handleResend}
            className="text-sm text-purple-primary hover:text-purple-hover font-semibold"
          >
            Resend OTP
          </button>
        )}

        <button
          type="submit"
          disabled={isLoading || otp.some((d) => !d)}
          className="w-full py-3 bg-purple-primary hover:bg-purple-hover text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-base"
        >
          {isLoading ? "Verifying..." : "Continue"}
        </button>

        <p className="text-xs text-gray-500 text-center">
          For testing, use OTP: <span className="text-white font-semibold">123456</span>
        </p>
      </form>
    </div>
  );
}