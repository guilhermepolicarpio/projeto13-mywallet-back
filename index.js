import express, { Router } from 'express';
import cors from 'cors'
import {MongoClient} from 'mongodb'

const server = express();
server.use(cors());
server.use(express.json());

server.listen(5000, () => console.log("Rodando"))