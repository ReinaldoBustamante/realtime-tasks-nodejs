import { Router } from "express";
import { TasksController } from "./controller";
import { TaskService } from "../../../domain/service/tasks.service";

export class TasksRoutes {
    
    public static router(){
        const router = Router();
        const taskService = new TaskService();
        const tasksController = new TasksController(taskService);

        router.get('/', tasksController.getTasks)
        router.post('/', tasksController.createTask)
        
        return router
    }
}