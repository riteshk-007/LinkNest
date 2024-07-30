import bcryptjs from "bcryptjs";
import { UserInputError } from "apollo-server-micro";
import prisma from "@/DB/db.config";

const Resolvers = {
  Query: {
    user: async (_: any, args: { id: string }) => {
      try {
        const user = await prisma.user.findUnique({
          where: { id: args.id },
          include: { links: true },
        });
        return user;
      } catch (error) {
        throw new UserInputError("Failed to get user");
      }
    },
  },
  Mutation: {
    createUser: async (
      _: any,
      args: { email: string; username: string; password: string; desc: string }
    ) => {
      try {
        const { email, username, password, desc } = args;
        if (
          email.trim() === "" ||
          username.trim() === "" ||
          password.trim() === "" ||
          desc.trim() === ""
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
          where: { username: username },
        });
        if (usernameCheck) {
          throw new UserInputError("Username already exists");
        }
        const user = await prisma.user.create({
          data: {
            email,
            username,
            password: hashedPassword,
            desc,
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
        });

        if (!user) {
          throw new UserInputError("User not found");
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
  },
};

export default Resolvers;
