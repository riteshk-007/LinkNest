"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { IoMdAdd } from "react-icons/io";
import Image from "next/image";
import { CreateLinkDialogProps, FormInputs, SocialIcon } from "@/types/types";
import { LayoutGrid } from "lucide-react";
import { useMutation } from "@apollo/client";
import { CREATE_LINK, GET_USER } from "@/app/Graphql/Queries";
import { toast } from "sonner";

const socialIcons: SocialIcon[] = [
  {
    name: "Facebook",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
  },
  {
    name: "Twitter",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg",
  },
  {
    name: "Instagram",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
  },
  {
    name: "LinkedIn",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
  },
  {
    name: "YouTube",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png",
  },
  {
    name: "GitHub",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",
  },
  {
    name: "TikTok",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/b/b6/Tiktok_logo_text.svg",
  },
  {
    name: "Snapchat",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Snapchat_logo.svg/1200px-Snapchat_logo.svg.png",
  },
  {
    name: "Pinterest",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png",
  },
  {
    name: "Reddit",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/b/b4/Reddit_logo.svg",
  },
  {
    name: "Slack",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/7/76/Slack_Icon.png",
  },
  {
    name: "Discord",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/5/58/Made-myself-a-custom-discord-icon-v0-t9j9padwfdqb1.png",
  },
  {
    name: "WhatsApp",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
  },
  {
    name: "Telegram",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg",
  },
  {
    name: "Medium",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/e/ec/Medium_logo_Monogram.svg",
  },
  {
    name: "Spotify",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
  },
];

const CreateLinkDialog: React.FC<CreateLinkDialogProps> = ({
  buttonText = "Create Link",
  user,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();

  const selectedIcon = watch("icon");

  const [createLink] = useMutation(CREATE_LINK, {
    onError: (error) => {
      setIsLoading(false);
      const errorMessage =
        error.graphQLErrors?.[0]?.message ||
        "An error occurred while creating link";
      toast.error(errorMessage);
      setError(errorMessage);
    },
    onCompleted: () => {
      toast.success("Link created successfully");
      setIsLoading(false);
    },
    refetchQueries: [
      {
        query: GET_USER,
        variables: { userId: user?.user?.id ? user.user.id : "" },
      },
    ],
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    if (!user?.user?.id) {
      toast.error("User ID is not available");
      return;
    }

    setIsLoading(true);

    createLink({
      variables: {
        url: data.url,
        title: data.title,
        userId: user.user.id,
        image: data.icon?.imageUrl,
      },
    });

    setIsLoading(false);
    setIsOpen(false);
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          onClick={() => setIsOpen(true)}
          className="relative inline-flex h-10 md:h-12 overflow-hidden rounded-lg p-0.5 focus:outline-none shadow-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-75 blur-sm" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
            <IoMdAdd className="h-5 w-5" />
            <span className="ml-2">{buttonText}</span>
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[90vw] md:max-w-[600px] bg-[#1c1b1f] rounded-xl shadow-md border-zinc-600">
        <DialogHeader>
          <DialogTitle className="text-white">Create New Link</DialogTitle>
          <DialogDescription className="text-gray-400">
            Add a new link to your profile.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="text-white">
                Title
              </label>
              <Input
                placeholder="Title"
                {...register("title", { required: "Title is required" })}
                className="bg-[#2c2b2f] text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              {errors.title && (
                <span className="text-red-500 text-sm">
                  {errors.title.message}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="url" className="text-white">
                URL
              </label>
              <Input
                placeholder="URL"
                {...register("url", {
                  required: "URL is required",
                  pattern: {
                    value: /^(ftp|http|https):\/\/[^ "]+$/,
                    message: "Invalid URL format",
                  },
                })}
                className="bg-[#2c2b2f] text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              {errors.url && (
                <span className="text-red-500 text-sm">
                  {errors.url.message}
                </span>
              )}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="bg-[#2c2b2f] text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                {selectedIcon ? (
                  <>
                    <Image
                      width={20}
                      height={20}
                      src={selectedIcon.imageUrl}
                      alt={selectedIcon.name}
                      className="mr-2 h-4 w-4"
                    />
                    <span>{selectedIcon.name}</span>
                  </>
                ) : (
                  <>
                    <LayoutGrid className="h-4 w-4 mr-1" /> Select Icon
                  </>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#2c2b2f] text-white custom-scrollbar border-gray-700 max-h-60 overflow-y-auto rounded-lg shadow-md">
              <DropdownMenuLabel>Social Media Icons</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {socialIcons.map((item) => (
                <DropdownMenuItem
                  key={item.name}
                  onClick={() => setValue("icon", item)}
                  className="cursor-pointer hover:bg-[#3c3b3f] flex items-center "
                >
                  <Image
                    width={20}
                    height={20}
                    src={item.imageUrl}
                    alt={item.name}
                    className="mr-2 h-4 w-4"
                  />
                  <span>{item.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isLoading ? "Creating..." : "Create"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLinkDialog;
