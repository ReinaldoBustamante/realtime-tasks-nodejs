import { Response } from "express"

export class CustomError extends Error{
    constructor(
        public statusCode: number,
        public message: string
    ){
        super(message)
    }

    public static badRequest(message: string){
        throw new CustomError(400, message)
    }    

    public static notFound(message: string){
        throw new CustomError(404, message)
    }

    public static conflict(message: string){
        throw new CustomError(409, message)
    }

    public static showError(error: unknown, res: Response) {
        if (error instanceof CustomError) {
            res.status(error.statusCode).json({ error: error.message })
        } else {
            console.log(error)
            res.status(500).json({ error: 'internal server error' })
        }
    }
}

