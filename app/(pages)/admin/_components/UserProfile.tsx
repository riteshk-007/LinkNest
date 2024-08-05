"use client";

import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import Logo from "../../_components/Logo";
import { GET_USER, GET_USER_BY_USERNAME } from "@/app/Graphql/Queries";
import { CustomSession, User, UserProfileProps, Link } from "@/types/types";
import { LinkIcon } from "lucide-react";
import Error from "./Error";
import { Share } from "../../_components/Share";
import { motion } from "framer-motion";

const UserProfile: React.FC<UserProfileProps> = ({
  username: propUsername,
}) => {
  const { data: session } = useSession();
  const sessionData = session as CustomSession | null;

  const params = useParams();
  const username = params.username || propUsername;

  const { data, loading, error } = useQuery<
    { user: User } | { userByUsername: User }
  >(
    sessionData && sessionData.user?.username === username
      ? GET_USER
      : GET_USER_BY_USERNAME,
    {
      variables:
        sessionData && sessionData.user?.username === username
          ? { userId: sessionData.user?.id }
          : { username },
    }
  );

  const user: User | undefined =
    sessionData && sessionData.user?.username === username
      ? (data as { user: User })?.user
      : (data as { userByUsername: User })?.userByUsername;

  const theme = user?.theme;

  const backgroundStyle: React.CSSProperties = theme
    ? theme.image && theme.gradientFrom && theme.gradientTo && theme.angle
      ? {
          backgroundImage: `linear-gradient(${theme.angle}deg, ${theme.gradientFrom}, ${theme.gradientTo}), url(${theme.image})`,
          backgroundSize: "cover, cover",
          backgroundPosition: "center, center",
          backgroundBlendMode: "overlay",
        }
      : theme.image
      ? {
          backgroundImage: `url(${theme.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }
      : theme.gradientFrom && theme.gradientTo && theme.angle
      ? {
          backgroundImage: `linear-gradient(${theme.angle}deg, ${theme.gradientFrom}, ${theme.gradientTo})`,
        }
      : { backgroundColor: "black" }
    : { backgroundColor: "black" };

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
          No user found with the provided information. Please try again later.
        </Error>
      </div>
    );

  const imageSrc = user?.image?.url;
  const imageAlt = user.username;

  return (
    <div className="flex flex-col h-screen" style={backgroundStyle}>
      <div className="absolute right-6 top-6">
        <Share />
      </div>
      {/* User Info Section */}
      <div className="flex-shrink-0 pt-8 pb-4">
        {/* User Image */}
        <div className="flex justify-center">
          {imageSrc ? (
            renderImage(imageSrc, imageAlt)
          ) : (
            <div className="w-32 h-32 bg-black rounded-full flex items-center justify-center">
              <Logo />
            </div>
          )}
        </div>

        {/* Username */}
        <h2 className="text-2xl font-bold text-center mt-4 text-white capitalize">
          {user.username}
        </h2>

        {/* Description */}
        <p className="text-center text-white mt-2 px-6 text-sm">
          {user.desc || "No description provided."}
        </p>
      </div>

      {/* Link List */}
      <div className="flex items-center flex-col justify-start pb-16 pt-4 overflow-y-auto custom-scrollbar px-4 ">
        {user.links && user.links.length > 0 ? (
          user.links.map((link: Link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full max-w-md items-center bg-foreground bg-opacity-20 rounded-lg p-3 mb-3 hover:bg-opacity-30 transition-all"
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
              <span className="text-muted font-medium ml-3">{link.title}</span>
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

const renderImage = (src: string, alt: string): JSX.Element => (
  <motion.div
    whileHover={{ scale: 1.1, borderRadius: "15%" }}
    whileFocus={{ scale: 1.4, borderRadius: "15%" }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
    className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg overflow-hidden"
    tabIndex={0}
  >
    <Image
      src={src}
      alt={alt}
      width={130}
      height={130}
      className="object-cover w-full h-full"
    />
  </motion.div>
);
