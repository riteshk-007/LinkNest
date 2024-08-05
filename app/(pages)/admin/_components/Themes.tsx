"use client";
import React, { useState } from "react";
import { PaintBucket, Sparkles } from "lucide-react";
import { CustomSession, Theme, ThemeCardProps } from "@/types/types";
import { useMutation, useQuery } from "@apollo/client";
import { GET_THEMES, GET_USER, UPDATE_USER_THEME } from "@/app/Graphql/Queries";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

const Themes: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);

  const { data, loading, error } = useQuery<{ themes: Theme[] }>(GET_THEMES);
  const { data: session } = useSession();
  const sessionData = session as CustomSession | null;

  const [updateUserTheme] = useMutation(UPDATE_USER_THEME, {
    onError: (error) => {
      const errorMessage =
        error.graphQLErrors?.[0]?.message ||
        "An error occurred. Please try again.";
      toast.error(errorMessage);
    },
    onCompleted: () => {
      toast.success("Theme updated successfully");
    },
    refetchQueries: [
      {
        query: GET_USER,
        variables: {
          userId: sessionData?.user?.id ? sessionData?.user?.id : "",
        },
      },
    ],
  });

  const handleThemeSelect = (theme: Theme) => {
    setSelectedTheme(theme);
    updateUserTheme({
      variables: { userId: sessionData?.user?.id, themeId: theme.id },
    });
  };

  const themes = data?.themes || [];

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-gray-300"></div>
      </div>
    );

  if (error)
    <div className="text-red-500 text-center">Error fetching themes</div>;

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
