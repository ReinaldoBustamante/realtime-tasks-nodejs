import { Request, Response } from 'express'
import { CreateTaskDto } from '../../../domain/dtos/createTask.dto'
import { CustomError } from '../../../domain/errors/custom.error'
import { TaskService } from '../../../domain/service/tasks.service'
import { UpdateTaskDto } from '../../../domain/dtos/updateTask.dto'
import { wssInstance } from '../../../domain/service/wss.service'

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
            if(error) throw CustomError.badRequest(error);
            const task = await this.taskServices.createTask(createTaskDto!)
            wssInstance.broadcast({
                type: 'newTask',
                payload: task
            })
            res.status(201).json(task)
        } catch (error){
            CustomError.showError(error, res)
        }
    }

    public deleteTask = async (req: Request, res: Response) => {
        const id = +req.params.id
        try {
            if(isNaN(id) || id < 0) throw CustomError.badRequest('id parameter must be a number greater than 0.')
            const taskDeleted = await this.taskServices.deleteTask(id)
            wssInstance.broadcast({
                type: 'taskDeleted',
                payload: taskDeleted
            })
            res.json(taskDeleted)
        } catch (error) {
            CustomError.showError(error, res)
        }
    }

    public updateTask = async (req: Request, res: Response) => {
        const id = +req.params.id
        const [error, updateTaskDto] = UpdateTaskDto.create(req.body)
        try{
            if(isNaN(id) || id < 0) throw CustomError.badRequest('id parameter must be a number greater than 0.')
            if(error) throw CustomError.badRequest(error)

            const taskUpdated = await this.taskServices.updateTask(id, updateTaskDto!)
            wssInstance.broadcast({
                type: 'taskUpdated',
                payload: taskUpdated
            })
            res.json(taskUpdated);
        } catch (error) {
            CustomError.showError(error, res)
        }
    }
}