import { Router } from "express";
import { TasksRoutes } from "./todos/router";

export class AppRoutes {
    constructor(){}

    public static router(): Router {
        const router = Router();
        
        router.use('/tasks', TasksRoutes.router())
        
        return router
    }
}