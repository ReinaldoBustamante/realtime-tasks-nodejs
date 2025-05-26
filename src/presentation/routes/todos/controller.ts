import {Request, Response} from 'express'

export class TasksController {
    constructor() {}

    public getTodos = (req: Request, res: Response) => {
        res.json({message: "get tasks"})
    }
}