import React, { useState } from "react";
import { MoreVertical, Link as LinkIcon, Edit, Trash } from "lucide-react";
import { LinkCardProps } from "@/types/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const LinkCard: React.FC<LinkCardProps> = ({
  title,
  url,
  image,
  onDelete,
  onEdit,
}) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleDelete = () => {
    setIsAlertOpen(true);
  };

  const handleDeleteConfirm = () => {
    setIsAlertOpen(false);
    onDelete();
  };

  const truncateUrl = (url: string, maxLength: number) => {
    if (url.length <= maxLength) return url;
    return url.substr(0, maxLength - 3) + "...";
  };

  return (
    <div className="w-full bg-gradient-to-br from-black to-gray-900 text-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-gray-800">
      <div className="p-6 flex items-start justify-between">
        <div className="flex items-center space-x-4 flex-grow min-w-0">
          <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full overflow-hidden">
            {image ? (
              <Image
                src={image}
                alt={title}
                width={100}
                height={100}
                className="rounded-full object-cover"
              />
            ) : (
              <LinkIcon
                size={24}
                color="white"
                className="bg-gradient-to-br from-blue-600 to-purple-700 w-11 h-11 rounded-full p-1"
              />
            )}
          </div>
          <div className="flex-grow min-w-0">
            <h3 className="font-semibold text-base capitalize truncate mb-1 text-gray-100">
              {title}
            </h3>
            <a
              href={url}
              className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkIcon size={16} className="flex-shrink-0 mr-2" />
              <span className="text-sm truncate">{truncateUrl(url, 40)}</span>
            </a>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-gray-400 hover:text-white transition-colors duration-200 ml-4 focus:outline-none">
              <MoreVertical size={24} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40 bg-gradient-to-b from-gray-900 to-black text-white border border-gray-800 rounded-md shadow-lg">
            <DropdownMenuItem
              onClick={onEdit}
              className="flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-700 transition-colors duration-200"
            >
              <Edit size={16} className="mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleDelete}
              className="flex items-center px-3 py-2 text-sm cursor-pointer text-red-400 hover:bg-gradient-to-r hover:from-red-900 hover:to-red-800 hover:text-white transition-colors duration-200"
            >
              <Trash size={16} className="mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent className="text-white bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-gray-100">
              Confirm Delete
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              Are you sure you want to delete this item? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="space-x-2">
            <AlertDialogCancel
              className="bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-white transition-colors duration-200"
              onClick={() => setIsAlertOpen(false)}
            >
              Cancel
            </AlertDialogCancel>
            <Button
              onClick={handleDeleteConfirm}
              variant="destructive"
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition-colors duration-200"
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default LinkCard;
