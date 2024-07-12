import express from "express";
import todoRouter from "./todo";
import userRouter from "./user";
import loginRouter from "./login";

const router = express.Router();

router.use('/todos', todoRouter);
router.use('/users', userRouter);
router.use('/login', loginRouter);

export default router;