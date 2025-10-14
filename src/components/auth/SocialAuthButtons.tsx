"use client";

import { useState } from "react";
import Image from "next/image";
import GoogleIcon from "../../../public/images/googleIcon.svg";
import MicrosoftIcon from "../../../public/images/microsoftLogo.svg";

export default function SocialAuthButtons() {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleSocialSignIn = async (provider: "google" | "microsoft") => {
    setIsLoading(provider);
    try {
      window.location.href = `/api/auth/signin/${provider}?callbackUrl=/dashboard`;
    } catch (error) {
      console.error(`Error signing in with ${provider}:`, error);
      setIsLoading(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#2C2D33]"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-[#17181E] text-gray-400 font-normal">or</span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => handleSocialSignIn("google")}
        disabled={isLoading !== null}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#1E1F26] hover:bg-[#25262E] border border-[#2C2D33] rounded-lg text-white font-normal transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
      >
        <Image src={GoogleIcon} alt="Google Logo" width={20} height={20} />
        {isLoading === "google" ? "Signing in..." : "Sign in with Google"}
      </button>

      <button
        type="button"
        onClick={() => handleSocialSignIn("microsoft")}
        disabled={isLoading !== null}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#1E1F26] hover:bg-[#25262E] border border-[#2C2D33] rounded-lg text-white font-normal transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
      >
        <Image src={MicrosoftIcon} alt="Microsoft Logo" width={20} height={20} />
        {isLoading === "microsoft" ? "Signing in..." : "Sign in with Microsoft"}
      </button>
    </div>
  );
}