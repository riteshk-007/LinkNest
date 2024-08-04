"use client";
import { PhoneMockupProps } from "@/types/types";
import React from "react";

const PhoneMockup: React.FC<PhoneMockupProps> = ({ children }) => {
  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (date: Date) => {
    const hours = date
      .getHours()
      .toString()
      .padStart(2, "0");
    const minutes = date
      .getMinutes()
      .toString()
      .padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="relative w-80 h-[600px] rounded-[40px] shadow-xl overflow-hidden bg-neutral-900 p-1">
        {/* Notch */}
        <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-neutral-900 rounded-b-3xl z-[5px]"></div>

        {/* Status Bar */}
        <div className="flex justify-between items-center px-6 pt-2 text-white text-sm z-10">
          <span>{formatTime(currentTime)}</span>
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
