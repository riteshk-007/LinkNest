"use client";
import React, { useState } from "react";
import LinkCard from "./LinkCard";
import { Facebook } from "lucide-react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "@/app/Graphql/Queries";
import { useSession } from "next-auth/react";
import { CustomSession } from "@/types/types";
import LinksSkeletons from "./Skeletons/LinksSkeletons";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import CreateLinkDialog from "./CreateLinkDialog";

const AllLinksComp = () => {
  const { data: session } = useSession();
  const sessionData = session as CustomSession;
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { userId: sessionData?.user?.id ? sessionData.user.id : "" },
  });

  const [currentPage, setCurrentPage] = useState(1);
  const linksPerPage = 6;

  const handleDelete = () => {
    console.log("Delete clicked");
  };

  const handleEdit = () => {
    console.log("Edit clicked");
  };

  if (loading) return <LinksSkeletons />;
  if (error)
    return (
      <div className="flex items-center justify-center w-full h-20 bg-red-500 text-white rounded-md">
        Error: {error.message}
      </div>
    );

  const links = data?.user?.links || [];
  const totalPages = Math.ceil(links.length / linksPerPage);
  const indexOfLastLink = currentPage * linksPerPage;
  const indexOfFirstLink = indexOfLastLink - linksPerPage;
  const currentLinks = links.slice(indexOfFirstLink, indexOfLastLink);

  return (
    <div className="flex w-full items-center justify-start flex-col gap-2 p-2">
      <div className="flex w-full items-center justify-between">
        <span>
          <span className="sm:text-lg font-bold">All Links</span>
          <span className="text-xs text-slate-500"> -{links.length} links</span>
        </span>
        <CreateLinkDialog buttonText="Add Link" user={sessionData} />
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {currentLinks.map((link: any) => (
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
      <>
        {currentLinks.length === 0 && (
          <div className="flex items-center justify-center w-full h-20  text-white rounded-md">
            No links found
          </div>
        )}
      </>

      {totalPages > 1 && (
        <Pagination className="mt-5 select-none">
          <PaginationContent>
            <PaginationItem className="cursor-pointer">
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index} className="cursor-pointer">
                <PaginationLink
                  className={
                    currentPage === index + 1 ? "bg-zinc-800" : "bg-black"
                  }
                  onClick={() => setCurrentPage(index + 1)}
                  isActive={currentPage === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem className="cursor-pointer">
              <PaginationNext
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default AllLinksComp;
