import db from "../db.js";
import dayjs from "dayjs";
import { operationSchema } from '../schemas/userSchema.js';

export async function getTransition (req,res){
 
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "").trim();

    try{
        const session = await db.collection("sessions").findOne({token});
        if(!session){
            return res.sendStatus(401);
        }
 
        const data = await db.collection("transition").find({userId: session.userId}).toArray();
        const reverseData = data.reverse();
        return res.send(reverseData)
    }
    catch (error){
        return res.status(500).send(error);
    }
}

export async function credit(req,res){
    
    const {value,description} = req.body;
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "").trim();
 
    const validation = operationSchema.validate(req.body, {abortEarly: true});

    if(validation.error){
        return res.status(422).send("Valor ou descrição inválidos!");
    }
    try{
        const session = await db.collection("sessions").findOne({token});
        if(!session){
            return res.sendStatus(401);
        }
    
    await db.collection("transition").insertOne({
        userId: session.userId,
        value: value,
        description: description,
        status: "credit",
        date: dayjs().format("DD/MM")
    })
    return res.sendStatus(200);
    } 
    
    catch(error){
    console.log("erro no credito")
    return res.status(500).send(error);
    }
}

export async function debit(req,res){
    
    const {value,description} = req.body;
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "").trim();

    const validation = operationSchema.validate(req.body, {abortEarly: true});

    if(validation.error){
        return res.status(422).send("Valor ou descrição inválidos!");
    }
 
    try{
        const session = await db.collection("sessions").findOne({token});
        if(!session){
            return res.sendStatus(401);
        }
    
    await db.collection("transition").insertOne({
        userId: session.userId,
        value: value,
        description: description,
        status: "debit",
        date: dayjs().format("DD/MM")
    })
    return res.sendStatus(200) 
    } 
    catch(error){
    return res.status(500).send(error);
    }
}
