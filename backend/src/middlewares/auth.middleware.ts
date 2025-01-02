import jwt, { decode, JwtPayload } from "jsonwebtoken";
import { Request } from "express";
import { ApiError } from "../utils/ApiError";
import { PrismaClient } from "@prisma/client";

export const verifyJWT = async (req: Request, _: any, next: () => {}) => {
  try {
    const token: string =
      req.cookies?.accessToken ||
      req.header("Authorizaiton")?.replace("Bearer ", "");

    console.log(token);

    if (!token) {
      return new ApiError({
        errorMessage: "Invalid token",
        statusCode: 401,
      });
    }

    const decodedToken: string | JwtPayload = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    const prisma = new PrismaClient();

    next();
    // const user = prisma.user.findUnique(decodedToken._id).
  } catch (error) {
    return new ApiError({
      errorMessage: "Bad auth",
      statusCode: 401,
    });
  }
};
