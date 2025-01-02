import { PrismaClient, User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { hash, compare } from "bcrypt";

const prismaClientSingleton = () => {
  return new PrismaClient().$extends({
    query: {
      user: {
        // hashes password right before the user is created
        async create({ args, query }) {
          if (args.data["password"]) {
            try {
              args.data["password"] = await hash(args.data["password"], 10);
              return query(args);
            } catch (error) {
              throw new Error(
                "Error while hashing password, couldn't execute create user query"
              );
            }
          }
        },
        // hashes password right before the user is updated
        async update({ args, query }) {
          if (args.data["password"]) {
            try {
              args.data["password"] = await hash(
                args.data["password"] as string,
                10
              );
              return query(args);
            } catch (error) {
              throw new Error(
                "Error while hashing password, couldn't execute update user query"
              );
            }
          }
        },
      },
    },
  });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
