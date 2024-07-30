"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Copy, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomSession } from "@/types/types";

export function Share() {
  const { data: session } = useSession();

  const sessionData = session as CustomSession;

  const [open, setOpen] = useState(false);

  const shareUrl = `${
    process.env.NEXT_PUBLIC_BASE_URL
  }/${sessionData?.user?.username.toLowerCase()}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <span className="p-2 cursor-pointer border rounded-full bg-gray-100 text-black shadow-md hover:shadow-lg hover:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:outline-none transition-transform duration-200 ease-in-out transform hover:scale-105">
            <Share2 className="h-4 w-4" />
          </span>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-neutral-900 border border-neutral-700 text-white rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-center">
              Share link
            </DialogTitle>
            <DialogDescription className="text-neutral-400 text-center">
              Anyone with this link will be able to view this.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2 mt-4">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input
                id="link"
                value={shareUrl}
                readOnly
                className="bg-neutral-800 border-neutral-700 text-white focus:ring-2 focus:ring-neutral-600 focus:border-transparent"
              />
            </div>
            <Button
              onClick={handleCopy}
              size="sm"
              className="px-3"
              variant={"secondary"}
            >
              <span className="sr-only">Copy</span>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <DialogFooter className="flex justify-self-start">
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                className="bg-neutral-700 text-white hover:bg-neutral-600 focus:ring-2 focus:ring-neutral-500 focus:outline-none transition-colors duration-200"
              >
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
