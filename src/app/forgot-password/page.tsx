import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm";
import Image from "next/image";
import SignUpBanner from "../../../public/images/banner.svg";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-[#17181E] flex">
      <div className="hidden lg:flex lg:w-1/2 relative p-7">
        <div className="relative w-full h-full rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-gray-900/80 z-10" />
          <Image
            src={SignUpBanner}
            alt="Team collaboration"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 z-20 p-12 flex flex-col justify-end text-white">
            <h1 className="text-5xl font-semibold mb-6">
              Welcome to WORKHIVE!
            </h1>
            <ul className="space-y-3 text-lg font-normal">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  Employee Management: View detailed profiles, track
                  performance, and manage attendance.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  Performance Insights: Analyze team goals, progress, and
                  achievements.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  Attendance & Leaves: Track attendance patterns and manage
                  leave requests effortlessly.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-[#17181E]">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
