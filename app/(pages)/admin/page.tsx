import { Metadata } from "next";
import React from "react";
import AllLinksComp from "./_components/AllLinksComp";

export const metadata: Metadata = {
  title: "Home - Link Nest: All Your Social Links in One Place",
  description:
    "Easily access and share all your social media profiles with just one link. Join Link Nest today and streamline your online presence.",
};
const page = () => {
  return (
    <div className="grid lg:grid-cols-3 gap-3">
      <div className="lg:col-span-2 p-1 relative">
        <AllLinksComp />
      </div>
      <div className="lg:col-span-1 p-1 hidden md:block sticky top-4"></div>
    </div>
  );
};

export default page;
