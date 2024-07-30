"use client";

import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useQuery } from "@apollo/client";
import Logo from "../../_components/Logo";
import { GET_USER } from "@/app/Graphql/Queries";
import { CustomSession, User, UserProfileProps } from "@/types/types";
import { LinkIcon } from "lucide-react";
import Error from "./Error";
import { Share } from "../../_components/Share";

const UserProfile: React.FC<UserProfileProps> = ({
  backgroundColor,
  gradientFrom,
  gradientTo,
  username,
}) => {
  const backgroundStyle: React.CSSProperties =
    gradientFrom && gradientTo
      ? {
          backgroundImage: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})`,
        }
      : { backgroundColor: backgroundColor || "black" };

  const { data: session } = useSession();
  const sessionData = session as CustomSession;
  const { data, loading, error } = useQuery<{ user: User }>(GET_USER, {
    variables: { userId: sessionData?.user?.id ?? "" },
  });

  const user = data?.user;

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-gray-300"></div>
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <Error>{error.message}</Error>
      </div>
    );
  if (!user)
    return (
      <div className="flex justify-center items-center h-screen">
        <Error>
          No user found with the provided ID. Please try again later.
        </Error>
      </div>
    );

  return (
    <div className="flex flex-col h-screen" style={backgroundStyle}>
      <div className="absolute right-6 top-6">
        <Share />
      </div>
      {/* User Info Section */}
      <div className="flex-shrink-0 pt-8 pb-4">
        {/* User Image */}
        <div className="flex justify-center">
          {sessionData.user?.image ? (
            <Image
              src={sessionData.user?.image}
              alt={sessionData.user?.username}
              width={100}
              height={100}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-32 h-32 bg-black rounded-full flex items-center justify-center">
              <Logo />
            </div>
          )}
        </div>

        {/* Username */}
        <h2 className="text-2xl font-bold text-center mt-4 text-white">
          {sessionData.user?.username}
        </h2>

        {/* Description */}
        <p className="text-center text-white mt-2 px-6 text-sm">
          {sessionData.user?.desc}
        </p>
      </div>

      {/* Link List */}
      <div className="flex items-center flex-col justify-start pb-16 pt-4 overflow-y-auto custom-scrollbar px-4">
        {user.links.length > 0 ? (
          user.links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full max-w-md items-center bg-white bg-opacity-20 rounded-lg p-3 mb-3 hover:bg-opacity-30 transition-all"
            >
              {link.image ? (
                <Image
                  src={link.image}
                  alt={link.title}
                  width={30}
                  height={30}
                  className="rounded-lg"
                />
              ) : (
                <LinkIcon
                  size={24}
                  color="white"
                  className="bg-gradient-to-br from-blue-500 to-purple-600 w-8 h-8 rounded-full p-1"
                />
              )}
              <span className="text-white font-medium ml-3">{link.title}</span>
            </a>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-1 p-4">
            <LinkIcon size={30} color="white" />
            <p className="text-muted text-center text-lg font-semibold mb-2">
              No links found
            </p>
            <p className="text-muted-foreground text-center">
              Add some links to your profile to get started.
            </p>
          </div>
        )}
      </div>

      {/* Logo */}
      <div className="w-52 h-10 mx-auto absolute bottom-0 left-1/2 flex items-center justify-center mb-3 bg-black p-2 rounded-lg -translate-x-1/2">
        <Logo />
      </div>
    </div>
  );
};

export default UserProfile;
