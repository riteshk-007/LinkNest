import React from "react";
import { AnimateBtnProps } from "@/types/types";

const AnimateBtn: React.FC<AnimateBtnProps> = ({ text }) => {
  return (
    <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group focus:outline-none focus:ring-4 focus:ring-cyan-200">
      <span className="absolute inset-0">
        <span className="w-full h-full bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 opacity-70 animate-border-move"></span>
      </span>
      <span className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 opacity-70 group-hover:opacity-0 transition-opacity duration-300 animate-border-move animation-delay-100"></span>
      <span className="relative px-5 py-2.5 transition-all ease-in duration-200 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 text-base font-semibold">
        {text}
      </span>
    </button>
  );
};

export default AnimateBtn;
