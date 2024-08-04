"use client";
import React, { useState } from "react";
import { PaintBucket, Sparkles } from "lucide-react";
import { Theme, ThemeCardProps } from "@/types/types";

const themes: Theme[] = [
  {
    id: "1",
    // image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    isPremium: false,
    gradientFrom: "#ff7e5f",
    gradientTo: "#feb47b",
    angle: 45,
  },
  {
    id: "2",
    // image: "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5",
    isPremium: false,
    gradientFrom: "#6a11cb",
    gradientTo: "#2575fc",
    angle: 60,
  },
  {
    id: "3",
    // image: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    isPremium: false,
    gradientFrom: "#fc466b",
    gradientTo: "#3f5efb",
    angle: 135,
  },
  {
    id: "4",
    // image: "https://images.unsplash.com/photo-1505144808419-1957a94ca61e",
    isPremium: false,
    gradientFrom: "#52c234",
    gradientTo: "#061700",
    angle: 90,
  },
  {
    id: "5",
    // image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    isPremium: false,
    gradientFrom: "#ff9966",
    gradientTo: "#ff5e62",
    angle: 120,
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
    isPremium: true,
    gradientFrom: "#8e2de2",
    gradientTo: "#4a00e0",
    angle: 30,
  },
  {
    id: "7",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
    isPremium: true,
    gradientFrom: "#f953c6",
    gradientTo: "#b91d73",
    angle: 75,
  },
  {
    id: "8",
    image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843",
    isPremium: true,
    gradientFrom: "#1a2a6c",
    gradientTo: "#b21f1f",
    angle: 150,
  },
  {
    id: "9",
    image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8",
    isPremium: true,
    gradientFrom: "#00b09b",
    gradientTo: "#96c93d",
    angle: 105,
  },
  {
    id: "10",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
    isPremium: true,
    gradientFrom: "#f12711",
    gradientTo: "#f5af19",
    angle: 165,
  },
];

const Themes: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);

  const handleThemeSelect = (theme: Theme) => {
    setSelectedTheme(theme);
    console.log("Selected Theme:", theme);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-tl from-gray-900 to-black text-white min-h-screen">
      <h1 className="text-4xl font-bold mb-8 from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent inline-block">
        Select Your Theme
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {themes.map((theme) => (
          <ThemeCard
            key={theme.id}
            theme={theme}
            isSelected={selectedTheme?.id === theme.id}
            onSelect={handleThemeSelect}
          />
        ))}
      </div>
    </div>
  );
};

const ThemeCard: React.FC<ThemeCardProps> = ({
  theme,
  isSelected,
  onSelect,
}) => {
  const { image, isPremium, gradientFrom, gradientTo, angle } = theme;

  const cardStyle = {
    backgroundImage: `linear-gradient(${angle}deg, ${gradientFrom}, ${gradientTo}), url(${image})`,
    backgroundBlendMode: "overlay",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div
      className={`relative rounded-xl overflow-hidden shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
        isSelected ? "ring-4 ring-blue-500 scale-105" : ""
      } ${isPremium ? "animate-pulse-slow" : ""}`}
      style={cardStyle}
      onClick={() => onSelect(theme)}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60" />
      <div className="relative p-6 h-64 flex flex-col justify-end">
        <div className="text-white text-center">
          <p
            className={`font-bold text-xl mb-2 ${
              isPremium ? "text-yellow-300" : "text-white"
            }`}
          >
            {isPremium ? "Premium" : "Free"}
          </p>
          {isPremium ? (
            <Sparkles className="mx-auto text-yellow-300" size={28} />
          ) : (
            <PaintBucket className="mx-auto text-white" size={24} />
          )}
        </div>
      </div>
      {isPremium && (
        <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-xs font-bold">
          PREMIUM
        </div>
      )}
    </div>
  );
};

export default Themes;
