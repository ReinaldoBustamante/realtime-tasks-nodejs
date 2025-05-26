import { prisma } from "../../config/db/connection";
import { CreateTaskDto } from "../dtos/createTask.dto";

export class TaskService {
    constructor(){}

    public async getTasks(){
        const tasks = await prisma.tasks.findMany()
        return tasks
    }

    public async createTask(createTaskDto: CreateTaskDto){
        const task = await prisma.tasks.create({
            data: createTaskDto
        })
        return task
    }
}