import React from "react";
import UserProfile from "../admin/_components/UserProfile";
import { Metadata } from "next";

interface PageProps {
  params: {
    username: string;
  };
}

export const generateMetadata = ({ params }: PageProps): Metadata => {
  const { username } = params;
  return {
    title: `LINK NEST - ${username}`,
    description: `A collection of all social media links for ${username} in one place.`,
  };
};

const UsernamePage = ({ params }: PageProps) => {
  const { username } = params;
  return (
    <div>
      <UserProfile
        gradientFrom="#4a90e2"
        gradientTo="#81c784"
        // username={username}
      />
    </div>
  );
};

export default UsernamePage;
