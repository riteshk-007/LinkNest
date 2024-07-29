import React from "react";
import Logo from "../../_components/Logo";
import { UserProfileProps } from "@/types/types";
import Image from "next/image";

const UserProfile: React.FC<UserProfileProps> = ({
  userImage,
  username,
  description,
  links,
}) => {
  return (
    <div className="flex flex-col h-full">
      {/* User Info Section */}
      <div className="flex-shrink-0 pt-8 pb-4">
        {/* User Image */}
        <div className="flex justify-center">
          {userImage ? (
            <Image
              src={userImage}
              alt={username}
              width={100}
              height={100}
              className="rounded-full object-cover "
            />
          ) : (
            <div className="w-32 h-32 bg-black  rounded-full flex items-center justify-center">
              <Logo />
            </div>
          )}
        </div>

        {/* Username */}
        <h2 className="text-2xl font-bold text-center mt-4 text-white">
          {username}
        </h2>

        {/* Description */}
        <p className="text-center text-white mt-2 px-6 text-sm">
          {description}
        </p>
      </div>

      {/* Link List */}
      <div className="flex-grow overflow-y-auto px-6 pb-16 custom-scrollbar">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            className="flex items-center bg-white bg-opacity-20 rounded-lg p-3 mb-3 hover:bg-opacity-30 transition-all"
          >
            <link.icon size={24} className="text-white mr-3" />
            <span className="text-white font-medium">{link.title}</span>
          </a>
        ))}
      </div>

      {/* Logo */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black p-2 rounded-lg">
        <Logo />
      </div>
    </div>
  );
};

export default UserProfile;
