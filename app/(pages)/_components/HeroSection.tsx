"use client";
import { StarProps, StarsProps } from "@/types/types";
import { Sparkles, SquareArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const Star: React.FC<StarProps> = ({ top, left, size }) => (
  <div
    className="absolute rounded-full bg-white"
    style={{
      top: `${top}%`,
      left: `${left}%`,
      width: `${size}px`,
      height: `${size}px`,
      opacity: Math.random() * 0.7 + 0.3,
      animation: `twinkle ${Math.random() * 4 + 2}s infinite alternate, float ${
        Math.random() * 10 + 5
      }s infinite alternate`,
    }}
  />
);

const Stars: React.FC<StarsProps> = ({ count }) => (
  <>
    {[...Array(count)].map((_, i) => (
      <Star
        key={i}
        top={Math.random() * 100}
        left={Math.random() * 100}
        size={Math.random() * 2 + 1}
      />
    ))}
  </>
);

const HeroSection: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-neutral-900 text-center p-6 relative overflow-hidden">
      <Stars count={300} />
      <div className="mb-4 relative z-10">
        <button className="bg-neutral-800 text-gray-300 py-2 px-6 rounded-full flex items-center justify-center space-x-2 shadow-md text-xs border-2 border-neutral-600">
          <Sparkles size={18} color="gold" />
          <span>Link Nest</span>
          <SquareArrowRight
            size={18}
            className="bg-sky-600 text-white rounded-md"
          />
        </button>
      </div>
      <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 mb-6 relative z-10">
        All Your Social Links in One Place
      </h1>
      <p className="text-lg md:text-xl bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 mb-8 relative z-10">
        Easily access and share all your social media profiles with just one
        link. Join Link Nest today and streamline your online presence.
      </p>
      <Link
        href={"/authenticate"}
        className="bg-white text-black py-2 px-6 rounded-md text-sm hover:bg-gray-200 relative z-10"
      >
        Get Started for free →
      </Link>
      <style jsx>{`
        @keyframes twinkle {
          0% {
            opacity: 0.3;
          }
          100% {
            opacity: 1;
          }
        }
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-10px) translateX(5px);
          }
          100% {
            transform: translateY(0) translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
