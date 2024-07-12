import express from "express";
import { login } from "../services/login";

const loginRouter = express.Router();

loginRouter.post('', login);

export default loginRouter;