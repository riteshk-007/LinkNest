import { Metadata } from "next";
import React from "react";
// import AddLinks from "./_components/AddLinks";
// import Preview from "./_components/Preview";

export const metadata: Metadata = {
  title: "Home - Link Nest: All Your Social Links in One Place",
  description:
    "Easily access and share all your social media profiles with just one link. Join Link Nest today and streamline your online presence.",
};
const page = () => {
  return <div className="grid lg:grid-cols-2 gap-4"></div>;
};

export default page;
