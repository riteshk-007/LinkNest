import { PhoneMockupProps } from "@/types/types";
import React from "react";

const PhoneMockup: React.FC<PhoneMockupProps> = ({
  children,
  backgroundColor,
  gradientFrom,
  gradientTo,
}) => {
  const backgroundStyle =
    gradientFrom && gradientTo
      ? {
          backgroundImage: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})`,
        }
      : { backgroundColor: backgroundColor || "black" };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div
        className="relative w-80 h-[600px] rounded-[40px] shadow-xl overflow-hidden"
        style={backgroundStyle}
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-[5px]"></div>

        {/* Status Bar */}
        <div className="flex justify-between items-center px-6 pt-2 text-white text-sm z-10">
          <span>9:41</span>
          <div className="flex space-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
};

export default PhoneMockup;
