import React from "react";
import { MoreVertical, Link as LinkIcon, Edit, Trash } from "lucide-react";
import { LinkCardProps } from "@/types/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LinkCard: React.FC<LinkCardProps> = ({
  title,
  url,
  icon,
  onDelete,
  onEdit,
}) => {
  const truncateUrl = (url: string, maxLength: number) => {
    if (url.length <= maxLength) return url;
    return url.substr(0, maxLength - 3) + "...";
  };

  return (
    <div className="w-full bg-neutral-900 text-white rounded shadow-lg overflow-hidden">
      <div className="p-4 flex items-start justify-between">
        <div className="flex items-center space-x-3 flex-grow min-w-0">
          <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-gray-700 rounded-full">
            {icon}
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
              onClick={onDelete}
              className="flex items-center px-2 py-2 text-sm cursor-pointer  text-red-400 hover:bg-red-500 hover:text-white"
            >
              <Trash size={16} className="mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default LinkCard;
