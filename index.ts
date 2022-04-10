import express, { Express, Request, Response } from 'express';
import {Server} from 'http';
import {Server as SocketIOServer} from 'socket.io';
import dotenv from 'dotenv';
import {socketHandler} from "./socket";
import path from "path";
import cors from 'cors';

dotenv.config();

const app: Express = express();
app.use(cors({
    origin: ['http://192.168.122.197:4200', 'http://localhost:4200', 'http://10.12.152.153:4200']
}))

const port = process.env.PORT;
const host = process.env.HOST;

const server = new Server(app);

const io = new SocketIOServer(server, {
    cors: {
        origin: ['http://192.168.122.197:4200', 'http://localhost:4200', 'http://10.12.152.153:4200']
    }
});

app.get('/', (req: Request, res: Response) => {
    res.sendFile('index.html', {
        root: path.join(__dirname + '/public')
    });
});

io.on("connection", socketHandler);

server.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://${host}:${port}`);
});
