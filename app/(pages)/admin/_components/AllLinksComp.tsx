"use client";
import React from "react";
import { IoMdAdd } from "react-icons/io";
import LinkCard from "./LinkCard";
import { Facebook } from "lucide-react";

const AllLinksComp = () => {
  const handleDelete = () => {
    console.log("Delete clicked");
  };

  const handleEdit = () => {
    console.log("Edit clicked");
  };
  return (
    <div className="flex w-full items-center justify-start flex-col gap-2 p-2">
      <div className="flex w-full items-center justify-between">
        {/*   top bar with title and add link button */}
        <span>
          <span className="sm:text-lg font-bold">All Links</span>
          <span className="text-xs text-slate-500"> - 5 links</span>
        </span>
        <button className="relative inline-flex md:h-12 overflow-hidden rounded-md p-[1px] focus:outline-none shadow-xl">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-zinc-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            <IoMdAdd className="h-5 w-5" />
            <span className="ml-1">Add Link</span>
          </span>
        </button>
      </div>
      {/* all links container*/}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <LinkCard
          title="Facebook"
          url="https://claude.ai/chat/171460c6-4588-4291-98f7-505188dc97f1"
          icon={<Facebook size={24} color="#1877F2" />}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
      {/* pagination */}
      <div className=""></div>
    </div>
  );
};

export default AllLinksComp;
