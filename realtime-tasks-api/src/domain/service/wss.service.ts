import { Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { CustomError } from "../errors/custom.error";

export class WssService {
    private wss?: WebSocketServer;

    constructor(){}
    
    public initializeWebSocket(server: Server){      
        if(!server) throw CustomError.badRequest('error en el servidor') 

        this.wss = new WebSocketServer({ server })
        this.wss.on('connection', (ws: WebSocket) => {
            console.log('websocket client connected')
          
            ws.on('close', () => {
                console.log('websocket client disconnected')
            })
        })
    }

    public broadcast(data: any){
        if (!this.wss) {
            console.warn("WebSocketServer no está inicializado.");
            return;
        }
        const message = JSON.stringify(data);
        this.wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN){
                client.send(message)
            }
        })
    }
}

export const wssInstance = new WssService();

