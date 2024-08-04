import bcryptjs from "bcryptjs";
import { UserInputError } from "apollo-server-micro";
import prisma from "@/DB/db.config";
import { utapi } from "@/utils/RemoveImageForServer";

const Resolvers = {
  Query: {
    user: async (_: any, args: { id: string }) => {
      try {
        const user = await prisma.user.findUnique({
          where: { id: args.id },
          include: { links: true, image: true },
        });
        return user;
      } catch (error) {
        throw new UserInputError("Failed to get user");
      }
    },
    userByUsername: async (_: any, args: { username: string }) => {
      try {
        const user = await prisma.user.findUnique({
          where: { username: args.username.toLowerCase() },
          include: { links: true, image: true },
        });
        if (!user) {
          throw new UserInputError("User not found");
        }
        return user;
      } catch (error) {
        throw new UserInputError("Failed to get user");
      }
    },
    themes: async () => {
      try {
        const themes = await prisma.theme.findMany();
        if (!themes) {
          throw new UserInputError("Themes not found");
        }
        return themes;
      } catch (error) {
        throw new UserInputError("Failed to get themes");
      }
    },
  },
  Mutation: {
    createUser: async (
      _: any,
      args: { email: string; username: string; password: string }
    ) => {
      try {
        const { email, username, password } = args;
        if (
          email.trim() === "" ||
          username.trim() === "" ||
          password.trim() === ""
        ) {
          throw new UserInputError("Please fill in all fields");
        }
        if (password.length < 6) {
          throw new UserInputError("Password must be at least 6 characters");
        }
        const existingUser = await prisma.user.findUnique({
          where: { email: email },
        });
        if (existingUser) {
          throw new UserInputError("User already exists");
        }
        const hashedPassword = await bcryptjs.hash(password, 12);

        const usernameCheck = await prisma.user.findUnique({
          where: { username: username.toLocaleLowerCase() },
        });
        if (usernameCheck) {
          throw new UserInputError("Username already exists");
        }
        const user = await prisma.user.create({
          data: {
            email,
            username: username.toLowerCase(),
            password: hashedPassword,
          },
        });
        return user;
      } catch (error) {
        if (error instanceof UserInputError) {
          throw error;
        }
        throw new Error("Failed to create user");
      }
    },
    createLink: async (
      _: any,
      args: { url: string; title: string; image: string; userId: string }
    ) => {
      try {
        const { url, title, image, userId } = args;
        if (url.trim() === "" || title.trim() === "") {
          throw new UserInputError("Please fill in all fields");
        }
        const link = await prisma.link.create({
          data: {
            url,
            title,
            image,
            userId,
          },
        });
        return link;
      } catch (error) {
        throw new UserInputError("Failed to create link");
      }
    },
    deleteLink: async (_: any, args: { id: string }) => {
      try {
        const link = await prisma.link.findUnique({
          where: { id: args.id },
        });

        if (!link) {
          throw new UserInputError("Link not found");
        }

        await prisma.link.delete({
          where: { id: args.id },
        });
        return link;
      } catch (error) {
        throw new UserInputError("Failed to delete link");
      }
    },
    deleteUser: async (_: any, args: { id: string }) => {
      try {
        const user = await prisma.user.findUnique({
          where: { id: args.id },
          include: { image: true },
        });

        if (!user) {
          throw new UserInputError("User not found");
        }

        if (user.image) {
          await utapi.deleteFiles([user.image.key]);
          await prisma.image.delete({ where: { id: user.image.id } });
        }

        await prisma.$transaction(async (prisma) => {
          await prisma.link.deleteMany({
            where: { userId: args.id },
          });

          await prisma.user.delete({
            where: { id: args.id },
          });
        });

        return user;
      } catch (error) {
        throw new UserInputError("Failed to delete user");
      }
    },
    updateUser: async (
      _: any,
      args: {
        id: string;
        email?: string;
        username?: string;
        password?: string;
        desc?: string;
        isPremium?: boolean;
      }
    ) => {
      const { id, email, username, password, desc, isPremium } = args;

      // Validate input
      if (!id.trim()) {
        throw new UserInputError("User ID is required");
      }

      // Check if user exists
      const existingUser = await prisma.user.findUnique({
        where: { id },
      });
      if (!existingUser) {
        throw new UserInputError("User not found");
      }
      // Prepare update data
      const updateData: any = {};

      if (email) updateData.email = email;
      if (username) {
        const usernameCheck = await prisma.user.findUnique({
          where: { username: username.toLowerCase() },
        });
        if (usernameCheck) {
          throw new UserInputError("Username already exists");
        }
        updateData.username = username.toLowerCase();
      }
      if (password) {
        if (password.length < 6) {
          throw new UserInputError("Password must be at least 6 characters");
        }
        updateData.password = await bcryptjs.hash(password, 12);
      }
      if (desc) updateData.desc = desc;
      if (isPremium !== undefined) updateData.isPremium = isPremium;

      try {
        // Update the user
        const updatedUser = await prisma.user.update({
          where: { id },
          data: updateData,
        });
        return updatedUser;
      } catch (error) {
        throw new Error("Failed to update user");
      }
    },
    updateImage: async (
      _: any,
      args: { userId: string; url: string; key: string }
    ) => {
      try {
        console.log(args);
        const { userId, url, key } = args;

        // Check if an image already exists for the user
        const existingImage = await prisma.image.findUnique({
          where: { userId },
        });

        // If an image exists, delete it
        if (existingImage) {
          await utapi.deleteFiles([existingImage.key]);
          await prisma.image.delete({
            where: { id: existingImage.id, userId: userId },
          });
        }

        // Create a new image
        const newImage = await prisma.image.create({
          data: {
            url,
            key,
            userId,
          },
        });

        return newImage;
      } catch (error) {
        if (error instanceof UserInputError) {
          throw error;
        }
        throw new Error("Failed to update image");
      }
    },
    createTheme: async (
      _: any,
      args: {
        image: string;
        isPremium: boolean;
        gradientFrom: string;
        gradientTo: string;
        angle: number;
      }
    ) => {
      try {
        const { image, isPremium, gradientFrom, gradientTo, angle } = args;
        const theme = await prisma.theme.create({
          data: {
            image,
            isPremium,
            gradientFrom,
            gradientTo,
            angle,
          },
        });
        return theme;
      } catch (error) {
        throw new UserInputError("Failed to create theme");
      }
    },
  },
};

export default Resolvers;
