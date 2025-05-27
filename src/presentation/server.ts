import express, { Router } from 'express'
import cors from 'cors'
import { createServer } from 'node:http'
import { wssInstance } from '../domain/service/wss.service';

export class ServerApp {
    constructor(
        public port: number,
        public routes: Router
    ){}

    public start(): void {
        const app = express();
        app.use(cors())
        app.use(express.json())

        const server = createServer(app)
        wssInstance.initializeWebSocket(server)

        app.use('/api', this.routes)
        
        server.listen(3000, () => {
            console.log('Server listening on port 3000')
        })
    }
}