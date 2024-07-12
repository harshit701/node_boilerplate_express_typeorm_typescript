import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import { handleError, handleSuccess } from '../utils/responseHandler';
import Joi from 'joi';
import { validate } from '../utils/validator';
import bcrypt from 'bcrypt';
import { Profile } from '../entity/Profile';

const userRepository = AppDataSource.getRepository(User);
const profileRepository = AppDataSource.getRepository(Profile);

// Get all users
export const findAll = async (req: Request, res: Response) => {
    try {
        let users = await userRepository.find({
            select: ['username', 'createdDate', 'email', 'id', 'isdeleted', 'profile', 'updatedDate'],
            relations: ['profile']
        });

        handleSuccess(res, users);
    } catch (error) {
        console.log('error', error);
        handleError(res, 500, `Internal server error: ${error}`);
    }
};

// Get a specific user by ID
export const findById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        let user = await userRepository.findOne({
            select: ['username', 'createdDate', 'email', 'id', 'isdeleted', 'profile', 'updatedDate'],
            where: {
                id
            },
            relations: ['profile']
        });
        if (user) {
            handleSuccess(res, user);
        } else {
            handleError(res, 404, 'User not found');
            return;
        }
    } catch (error) {
        console.log('error', error);
        handleError(res, 500, 'Internal server error');
    }
}

// Create user
export const add = async (req: Request, res: Response) => {
    const saltRounds = 10;
    try {
        const { username, email, password, full_name, birthdate, gender, avatar_url, bio, location, website } = req.body;
        const userSchema = Joi.object({
            username: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        });
        await validate(userSchema, {
            username, email, password
        });

        const profileSchema = Joi.object({
            full_name: Joi.string(),
            birthdate: Joi.date(),
            gender: Joi.string(),
            avatar_url: Joi.string(),
            bio: Joi.string(),
            location: Joi.string(),
            website: Joi.string(),
        });
        await validate(profileSchema, {
            full_name, birthdate, gender, avatar_url, bio, location, website
        });

        const passwordHash = await bcrypt.hash(password, saltRounds);
        const user = userRepository.create({
            username,
            email,
            password: passwordHash,
            isdeleted: false
        });
        const savedUser = await userRepository.save(user);

        if (savedUser) {
            const profile = profileRepository.create({
                full_name,
                birth_date: birthdate,
                gender,
                avatar_url,
                bio,
                location,
                website,
                isdeleted: false,
                user_id: savedUser.id
            });
            const savedProfile = await profileRepository.save(profile);
            // savedUser['profile'] = savedProfile;
        }

        const data = await userRepository.findOne({
            where: {
                id: savedUser.id
            }
        });

        handleSuccess(res, data);
    } catch (error) {
        handleError(res, error.statusCode, error.message);
    }
};

// Remove user
export const remove = async (req: Request, res: Response) => {
    const userId = req.params.id;

    try {
        const fetchUser = await userRepository.find({
            where: { id: userId },
            relations: ['profile']
        });

        if (fetchUser['profile']) {
            await profileRepository.delete({
                user_id: userId
            });

            const deletedUser = await userRepository.delete(userId);

            if (deletedUser) {
                handleSuccess(res, { message: 'User deleted successfully', user: deletedUser });
            }
        } else {
            handleError(res, 404, 'User not found');
            return;
        }
    } catch (error) {
        handleError(res, 500, error.message);
    }
};

// Update user