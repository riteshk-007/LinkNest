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
    <div className="w-full bg-neutral-900 text-white rounded shadow-lg overflow-hidden">
      <div className="p-4 flex items-start justify-between">
        <div className="flex items-center space-x-3 flex-grow min-w-0">
          <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-white rounded-full">
            {image ? (
              <Image
                src={image}
                alt={title}
                width={40}
                height={40}
                className="rounded-full bg-white"
              />
            ) : (
              <LinkIcon size={24} color="blue" />
            )}
          </div>
          <div className="flex-grow min-w-0">
            <div className="font-bold text-lg truncate">{title}</div>
            <a
              href={url}
              className="text-blue-400 hover:underline flex items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkIcon size={16} className="flex-shrink-0 mr-1" />
              <span className="text-sm truncate">{truncateUrl(url, 30)}</span>
            </a>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-gray-400 hover:text-white transition-colors duration-200 ml-2">
              <MoreVertical size={24} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-32 bg-neutral-800 text-white border-zinc-700">
            <DropdownMenuItem
              onClick={onEdit}
              className="flex items-center px-2 py-2 text-sm cursor-pointer hover:bg-gray-500"
            >
              <Edit size={16} className="mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleDelete}
              className="flex items-center px-2 py-2 text-sm cursor-pointer  text-red-400 hover:bg-red-500 hover:text-white"
            >
              <Trash size={16} className="mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent className="text-white bg-neutral-900 border-zinc-500">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this item? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="bg-zinc-500"
              onClick={() => setIsAlertOpen(false)}
            >
              Cancel
            </AlertDialogCancel>

            <Button onClick={handleDeleteConfirm} variant="destructive">
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default LinkCard;
