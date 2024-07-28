import bcryptjs from "bcryptjs";
import { UserInputError } from "apollo-server-micro";
import prisma from "@/DB/db.config";

const Resolvers = {
  Query: {
    user: async (
      _: any,
      args: { id: string; skip?: number; take?: number }
    ) => {
      const { id, skip = 0, take = 6 } = args;
      try {
        const user = await prisma.user.findUnique({
          where: { id },
          include: {
            links: {
              skip,
              take,
            },
          },
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
  },
};

export default Resolvers;
