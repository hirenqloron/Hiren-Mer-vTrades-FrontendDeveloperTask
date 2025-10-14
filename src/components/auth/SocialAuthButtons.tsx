"use client";

import { useState } from "react";
import Image from "next/image";
import GoogleIcon from "../../../public/images/googleIcon.svg";
import MicrosoftIcon from "../../../public/images/microsoftLogo.svg";
import { signIn } from "next-auth/react";

export default function SocialAuthButtons() {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSocialSignIn = async (provider: "google" | "microsoft") => {
    setIsLoading(provider);
    setError(null);
    
    try {
      // signIn with redirect: false to handle errors properly
      const result = await signIn(provider, { 
        callbackUrl: "/dashboard",
        redirect: false 
      });

      // Check for errors
      if (result?.error) {
        setError(`Failed to sign in with ${provider}. Please try again.`);
        console.error(`Sign in error:`, result.error);
        setIsLoading(null);
      } else if (result?.ok) {
        // Manually redirect on success
        window.location.href = result.url || "/dashboard";
      }
    } catch (error) {
      console.error(`Error signing in with ${provider}:`, error);
      setError(`Unable to connect to ${provider}. Please check your configuration.`);
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

      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

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