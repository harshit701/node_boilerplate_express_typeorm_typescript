import { Request, Response } from 'express';
import { Todo } from '../entity/Todo';
import { AppDataSource } from '../data-source';
import { handleError, handleSuccess } from '../utils/responseHandler';

const todoRepository = AppDataSource.getRepository(Todo);

// Get all todos
export const findAll = async (req: Request, res: Response) => {
    try {
        const todos = await todoRepository.find();
        handleSuccess(res, todos);
    } catch (error) {
        handleError(res, 500, 'Internal server error');
    }
};

// Get a specific todo by ID
export const findById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const todo = await todoRepository.findOne({
            where: {
                id
            }
        });
        if (todo) {
            handleSuccess(res, todo);
        } else {
            handleError(res, 404, 'Todo not found');
            return;
        }
    } catch (error) {
        handleError(res, 500, 'Internal server error');
    }
}

// Create a new todo
export const add = async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body;
        const todo = todoRepository.create({ title, description });
        const savedTodo = await todoRepository.save(todo);
        handleSuccess(res, savedTodo, 201);
    } catch (error) {
        handleError(res, 500, 'Internal server error');
    }
};

// Update a todo by ID
export const update = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, description, completed } = req.body;
        const todo = await todoRepository.findOne({
            where: {
                id
            }
        });
        if (todo) {
            todo.title = title ?? todo.title;
            todo.description = description ?? todo.description;
            todo.completed = completed ?? todo.completed;
            const updatedTodo = await todoRepository.save(todo);
            handleSuccess(res, updatedTodo);
        } else {
            handleError(res, 404, 'Todo not found');
            return;
        }
    } catch (error) {
        handleError(res, 500, 'Internal server error');
    }
};

// Delete a todo by ID
export const remove = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await todoRepository.delete(id);
        if (result.affected === 1) {
            handleSuccess(res, { message: 'Todo deleted successfully' });
        } else {
            handleError(res, 404, 'Todo not found');
            return;
        }
    } catch (error) {
        handleError(res, 500, 'Internal server error');
    }
};
