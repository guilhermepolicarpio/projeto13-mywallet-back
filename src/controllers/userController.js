import bcrypt from 'bcrypt';
import { v4 as uuid} from "uuid";
import db  from "../db.js";


export async function signIn(req, res){
    const {email, password} = req.body;
    const user = await db.collection("users").findOne({email});

    
    if(user && bcrypt.compareSync(password, user.password)){
        const token = uuid();

        await db.collection("sessions").insertOne({
            userId: user._id,
            token,
            name: user.name
        })

        return res.send({token, name: user.name});
    }

    return res.sendStatus(404);
}

export async function signUp(req, res){
    const user = req.body;

    console.log(req.body)

    try{
    
        const passwordHash=bcrypt.hashSync(user.password,11);
        
        delete user.password;
        delete user.confirmPassword;

        await db.collection("users").insertOne({... user, password: passwordHash})

        return res.status(200).send("Succesful on sign-up");
    }
    catch( error){
        console.log(error);
        return res.status(500).send("Error on sign-up");
    }
}