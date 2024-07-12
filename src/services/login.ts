import { Request, Response } from "express";
import Joi from "joi";
import { validate } from "../utils/validator";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { handleError, handleSuccess } from "../utils/responseHandler";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userRepository = AppDataSource.getRepository(User);

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });
    await validate(loginSchema, {
        email, password
    });

    try {
        let existingUser = await userRepository.findOne({
            select: ["id", "email", "username", "password"],
            where: {
                email
            },
            relations: ['profile']
        });

        if (!existingUser) {
            handleError(res, 404, 'user not found');
        }

        const hasedpassword = await bcrypt.compare(password, existingUser.password);

        if (hasedpassword) {
            //Creating jwt token
            const token = jwt.sign(
                {
                    id: existingUser.id,
                    email: existingUser.email,
                    username: existingUser.username
                },
                process.env.SECRETJSONWEBTOKEN,
                { expiresIn: process.env.TOKENEXPIRYTIME }
            );

            handleSuccess(res, { token });
        } else {
            handleError(res, 401, 'login details are incorrect!');
        }
    } catch (error) {
        handleError(res, 500, error.message);
    }
}