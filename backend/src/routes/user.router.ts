import { Router } from "express";

const userRouter = Router();

userRouter.route("/signup").post();

userRouter.route("/signin").post();

userRouter.route("/delete").delete();

userRouter.route("/update").put();

export default userRouter;
