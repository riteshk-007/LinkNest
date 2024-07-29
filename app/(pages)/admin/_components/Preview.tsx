import React from "react";
import PhoneMockup from "./PhoneMockup";
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import UserProfile from "./UserProfile";

const Preview = () => {
  const links = [
    { icon: FaTwitter, title: "Twitter", url: "https://twitter.com/username" },
    {
      icon: FaLinkedin,
      title: "LinkedIn",
      url: "https://linkedin.com/in/username",
    },
    { icon: FaGithub, title: "GitHub", url: "https://github.com/username" },
    {
      icon: FaInstagram,
      title: "Instagram",
      url: "https://instagram.com/username",
    },
    { icon: FaTwitter, title: "Twitter", url: "https://twitter.com/username" },
    {
      icon: FaLinkedin,
      title: "LinkedIn",
      url: "https://linkedin.com/in/username",
    },
    { icon: FaGithub, title: "GitHub", url: "https://github.com/username" },
    {
      icon: FaInstagram,
      title: "Instagram",
      url: "https://instagram.com/username",
    },
  ];
  return (
    <PhoneMockup gradientFrom="#4a90e2" gradientTo="#81c784">
      <UserProfile
        username="@Riteshk_007"
        description="Full Stack Developer"
        links={links}
      />
    </PhoneMockup>
  );
};

export default Preview;
