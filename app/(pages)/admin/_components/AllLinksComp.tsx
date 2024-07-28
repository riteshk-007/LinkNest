"use client";
import React from "react";
import { IoMdAdd } from "react-icons/io";
import LinkCard from "./LinkCard";
import { Facebook } from "lucide-react";
import { OperationVariables, QueryResult, useQuery } from "@apollo/client";
import { GET_USER } from "@/app/Graphql/Queries";
import { useSession } from "next-auth/react";
import { CustomSession } from "@/types/types";

const AllLinksComp = () => {
  const { data: session } = useSession();

  const sessionData = session as CustomSession;

  console.log(session);

  const { data, loading, error } = useQuery(GET_USER, {
    variables: { userId: sessionData?.user?.id },
  });

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
          <span className="text-xs text-slate-500">
            {" "}
            -{data && data.user.links.length} links
          </span>
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
        {loading && <div>Loading...</div>}
        {error && (
          <div className="flex items-center justify-center w-full h-20 bg-red-500 text-white rounded-md">
            Error: {error.message}
          </div>
        )}

        {data &&
          data.user.links.map((link: any) => (
            <LinkCard
              key={link.id}
              title={link.title}
              url={link.url}
              icon={<Facebook />}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
      </div>
      {/* pagination */}
      <div className=""></div>
    </div>
  );
};

export default AllLinksComp;
