import React from "react";
import PhoneMockup from "./PhoneMockup";
import UserProfile from "./UserProfile";

const Preview = () => {
  return (
    <PhoneMockup>
      <UserProfile gradientFrom="#4a90e2" gradientTo="#81c784" />
    </PhoneMockup>
  );
};

export default Preview;
