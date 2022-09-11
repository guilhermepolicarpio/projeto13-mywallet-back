import { ObjectId } from "mongodb";
import db from "../db.js"

export async function getTransition (req,res){
 
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "").trim();

    try{
        const session = await db.collection("sessions").findOne({token});
        if(!session){
            console.log("no session");
            return res.sendStatus(401);
        }
 
        const data = await db.collection("transition").find({userId: session.userId}).toArray();
        console.log(data)
        const reverseData = data.reverse();
        return res.send(reverseData)
    }
    catch (error){
        console.log("erro")
        return res.status(500).send(error);
    }
}

export async function credit(req,res){
    
    const {value,description} = req.body;
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "").trim();
 
    try{
        const session = await db.collection("sessions").findOne({token});
        if(!session){
            console.log("no session");
            return res.sendStatus(401);
        }
        console.log(session)
    
    await db.collection("transition").insertOne({
        userId: session.userId,
        value: value,
        description: description,
        status: "credit",
    })
    console.log("deu crertooo")
    return res.sendStatus(200)
    
   
} catch(error){
    console.log("erro no credito")
    return res.status(500).send(error);
}
}

export async function debit(req,res){
    
    const {value,description} = req.body;

    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "").trim();
 

    await db.collection("transition").insertOne({
       
        value: value,
        description: description,
        status: "debit",
        
    })
    res.sendStatus(200)
}