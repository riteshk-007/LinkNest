import { Metadata } from "next";
import React from "react";
import UserSetting from "../_components/UserSetting";

export const metadata: Metadata = {
  title: "Settings - Link Nest: All Your Social Links in One Place",
  description:
    "Easily access and share all your social media profiles with just one link. Join Link Nest today and streamline your online presence.",
};
const Setting = () => {
  return <UserSetting />;
};

export default Setting;
