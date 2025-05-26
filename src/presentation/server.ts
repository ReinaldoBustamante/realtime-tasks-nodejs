import express from 'express'

export class ServerApp {
    constructor(){}

    public start(): void {
        const app = express();

        app.get('/', (req,res) => {
            res.json({message: 'hello world'})
        })

        app.listen(3000, () => {
            console.log('Server listening on port 3000')
        })
    }
}