import { Request, Response } from 'express'
import { CreateTaskDto } from '../../../domain/dtos/createTask.dto'
import { CustomError } from '../../../domain/errors/custom.error'
import { TaskService } from '../../../domain/service/tasks.service'

export class TasksController {
    constructor(
        private taskServices: TaskService
    ) {}

    public getTasks = async (req: Request, res: Response) => {
        try{
            const tasks = await this.taskServices.getTasks()
            res.json(tasks)
        } catch (error) {
            CustomError.showError(error, res)
        }
    }

    public createTask = async (req: Request, res: Response) => {
        const [error, createTaskDto] = CreateTaskDto.create(req.body)
        try{
            if(error) CustomError.badRequest(error);
            const task = await this.taskServices.createTask(createTaskDto!)
            res.json(task)
        } catch (error){
            CustomError.showError(error, res)
        }
    }
}