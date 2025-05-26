import express, { Router } from 'express'

export class ServerApp {
    constructor(
        public port: number,
        public routes: Router
    ){}

    public start(): void {
        const app = express();

        app.use('/api', this.routes)

        app.listen(3000, () => {
            console.log('Server listening on port 3000')
        })
    }
}