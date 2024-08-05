import { Metadata } from "next";
import React from "react";
import PriceCards from "../_components/PriceCard";

export const metadata: Metadata = {
  title: "Upgrade Plan - Link Nest: All Your Social Links in One Place",
  description:
    "Join Link Nest today and easily access all your social media profiles with one link. Enhance your online presence with our premium features.",
};

const Upgrade: React.FC = () => {
  return (
    <div className="min-h-screen w-full text-white  bg-gradient-to-b from-gray-900 to-black">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h3 className="text-lg sm:text-xl font-semibold text-blue-400 mb-4 animate-pulse">
            Link Nest: All Your Social Links in One Place
          </h3>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-text">
            Elevate Your Online Presence
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Link Nest empowers visionary brands and creators like you with
            innovative features for seamless social media management. Choose the
            plan that fits your ambition.
          </p>
        </div>
        <PriceCards />
      </div>
    </div>
  );
};

export default Upgrade;
