import { Router } from "express";
import { TasksController } from "./controller";

export class TasksRoutes {
    
    public static router(){
        const router = Router();
        const tasksController = new TasksController();
        
        router.get('/', tasksController.getTasks)
        router.post('/', tasksController.createTask)
        
        return router
    }
}