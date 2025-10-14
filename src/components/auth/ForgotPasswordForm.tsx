"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setShowModal(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
  };

  return (
    <>
      <div className="w-full max-w-[440px] space-y-8">
        <div className="space-y-2">
          <h2 className="text-[32px] font-semibold text-white leading-[1.5]">
            Forgot Your Password?
          </h2>
          <p className="text-base font-normal text-gray-400">
            Don't worry! Enter your email address, and we'll send you a link to
            reset it.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-normal text-white mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-[#1E1F26] border border-[#2C2D33] rounded-lg text-white font-semibold placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-primary focus:border-purple-primary transition-all text-sm"
              placeholder="navinash@workhive.com"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-purple-primary hover:bg-purple-hover text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-base"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#23242B] rounded-2xl p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">
              Link Sent Successfully!
            </h3>
            <p className="text-gray-400 mb-8">
              Check your inbox! We've sent you an email with instructions to
              reset your password.
            </p>
            <button
              onClick={handleModalClose}
              className="px-8 py-3 bg-purple-primary hover:bg-purple-hover text-white font-semibold rounded-lg transition-colors"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </>
  );
}