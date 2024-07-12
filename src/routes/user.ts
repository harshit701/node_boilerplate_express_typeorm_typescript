import express from "express";
import { findAll, findById, add, remove } from "../services/user";

const userRouter = express.Router();

userRouter.get('', findAll);
userRouter.get('/:id', findById);
userRouter.post('', add);
userRouter.delete('/:id', remove);

export default userRouter;