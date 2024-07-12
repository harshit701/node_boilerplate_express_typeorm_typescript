import express from "express";
import { add, findAll, findById, remove, update } from "../services/todo";

const todoRouter = express.Router();

todoRouter.get('', findAll);
todoRouter.get('/:id', findById);
todoRouter.post('/', add);
todoRouter.delete('/:id', remove);
todoRouter.put('/:id', update);

export default todoRouter;