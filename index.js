import express from 'express';
import cors from 'cors'
import userRouter from "./src/routers/userRouter.js"
import transitionRouter from "./src/routers/transitionRouter.js"

const server = express();
server.use(cors());
server.use(express.json());

server.use(userRouter)
server.use(transitionRouter)
server.listen(5000, () => console.log("Rodando"))