import db from "../db.js"
import { v4 as uuid} from "uuid";

/*
export async function getTransition (req,res){

    const {user} = res.locals;
    try{
    const transitions = await db.collection("transitions").find({userId: user._id}).toArray();
    res.send(transitions);
    }catch (error){
        console.error(error);
        res.sendStatus(500);
    }
}*/

export async function credit(req,res){

    let {value,description} = req.body;

    await db.collection("transition").insertOne({
        value: value,
        description: description,
        status: "credit",
        
    })
    res.sendStatus(200)
}

export async function debit(req,res){

    let {value,description} = req.body;

    await db.collection("transition").insertOne({
        value: value,
        description: description,
        status: "credit",
        
    })
    res.sendStatus(200)
}