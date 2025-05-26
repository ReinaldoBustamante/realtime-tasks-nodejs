import { prisma } from "../../config/db/connection";
import { CreateTaskDto } from "../dtos/createTask.dto";
import { UpdateTaskDto } from "../dtos/updateTask.dto";
import { CustomError } from "../errors/custom.error";

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

    public async deleteTask(id: number){
        const taskExists = !!(await prisma.tasks.findUnique({
            where: {
                id
            }
        }))
        if(!taskExists) throw CustomError.notFound(`task with id: ${id} not found`)

        const taskDeleted = await prisma.tasks.delete({
            where: {
                id
            }
        })
        
        return taskDeleted
    }

    public async updateTask(id: number, updateTaskDto: UpdateTaskDto){
        const taskExists = !!(await prisma.tasks.findUnique({
            where: {
                id
            }
        }))
        if(!taskExists) throw CustomError.notFound(`task with id: ${id} not found`)
            
        const taskUpdated = await prisma.tasks.update({
            where: {
                id
            },
            data: updateTaskDto
        })
        return taskUpdated
    }
}