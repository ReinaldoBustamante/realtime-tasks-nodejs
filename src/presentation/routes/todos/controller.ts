import { Request, Response } from 'express'
import { CreateTaskDto } from '../../../domain/dtos/createTask.dto'
import { CustomError } from '../../../domain/errors/custom.error'
import { prisma } from '../../../config/db/connection'

export class TasksController {
    constructor() {}

    public getTasks = async (req: Request, res: Response) => {
        const tasks = await prisma.tasks.findMany()
        res.json(tasks)
    }

    public createTask = async (req: Request, res: Response) => {
        const [error, createTaskDto] = CreateTaskDto.create(req.body)
        try{
            if(error) CustomError.badRequest(error);
            const task = await prisma.tasks.create({
                data: createTaskDto!
            })
            res.json(task)
        } catch (error){
            if(error instanceof CustomError){
                res.status(error.statusCode).json({error: error.message})
            } else {
                res.status(500).json({error: 'internal server error'})
            }
        }
    }
}