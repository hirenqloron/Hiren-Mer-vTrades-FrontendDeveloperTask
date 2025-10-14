"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Check } from "lucide-react";

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Oops! Passwords Don't Match");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setShowModal(true);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    router.push("/");
  };

  return (
    <>
      <div className="w-full max-w-[440px] space-y-8">
        <div className="space-y-2">
          <h2 className="text-[32px] font-semibold text-white leading-[1.5]">
            Create New Password
          </h2>
          <p className="text-base font-normal text-gray-400">
            Choose a strong and secure password to keep your account safe. Make
            sure it's easy for you to remember, but hard for others to guess!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-normal text-white mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#1E1F26] border border-[#2C2D33] rounded-lg text-white font-semibold placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-all text-sm pr-12"
                placeholder="Workhiveadmin"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-normal text-white mb-2"
            >
              Re-enter your new password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={`w-full px-4 py-3 bg-[#1E1F26] border ${
                  error ? "border-red-500" : "border-[#2C2D33]"
                } rounded-lg text-white font-semibold placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-all text-sm pr-12`}
                placeholder="••••••••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {error && (
              <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                <span className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">
                  !
                </span>
                {error}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-base mt-6"
          >
            {isLoading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#23242B] rounded-2xl p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-white" strokeWidth={3} />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">
              Password Created!
            </h3>
            <p className="text-gray-400 mb-8">
              Your password has been successfully updated! You can now use your
              new password to log in.
            </p>
            <button
              onClick={handleModalClose}
              className="px-8 py-3 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold rounded-lg transition-colors"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </>
  );
}
