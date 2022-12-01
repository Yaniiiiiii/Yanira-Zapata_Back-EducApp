import { Router } from 'express';
import { UserController } from '../controller/user.controller.js';
import { ResourcesRepository } from '../repository/resources.repo.js';
import { UsersRepository } from '../repository/users.repo.js';

export const userRouter = Router();

export const controller = new UserController(UsersRepository.getInstance());

userRouter.post('/login', controller.login.bind(controller));
userRouter.post('/register', controller.register.bind(controller));
