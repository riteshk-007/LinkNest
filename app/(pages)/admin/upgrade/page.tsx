import { Metadata } from "next";
import React from "react";
import PriceCard from "../_components/PriceCard";

export const metadata: Metadata = {
  title: "Upgrade Plan - Link Nest: All Your Social Links in One Place",
  description:
    "Join Link Nest today and easily access all your social media profiles with one link. Enhance your online presence with our premium features.",
};

const Upgrade: React.FC = () => {
  return (
    <div
      className="w-full text-white flex flex-col items-center justify-start py-16 px-4 sm:px-6 lg:px-8"
      style={{
        background: "radial-gradient(circle, #111 80%, black 100%)",
      }}
    >
      <div className="w-full max-w-4xl mx-auto text-center mb-16">
        <h3 className="text-lg sm:text-xl font-semibold text-sky-400 mb-4">
          Link Nest: All Your Social Links in One Place
        </h3>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
          Designed for Visionary Brands And Creators Like You
        </h1>
        <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto">
          At Link Nest, we focus on enhancing your brand&apos;s online presence
          with innovative features for seamless social media management.
        </p>
      </div>
      <div className="w-full max-w-5xl mx-auto">
        <PriceCard />
      </div>
    </div>
  );
};

export default Upgrade;
