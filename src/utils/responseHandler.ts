import { Response } from "express";

export const handleSuccess = (res: Response, data: Object, statusCode: number = 200) => {
    res.status(statusCode).json({ data });
};

export const handleError = (res: Response, statusCode: number, message: string) => {
    res.status(statusCode).json({ error: message });
};
