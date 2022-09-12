import bcrypt from 'bcrypt';
import { v4 as uuid} from "uuid";
import db  from "../db.js";
import { registrationSchema,loginSchema } from '../schemas/userSchema.js';

export async function signIn(req, res){
    const {email, password} = req.body;
    const user = await db.collection("users").findOne({email});
    const validation = loginSchema.validate(req.body, {abortEarly: true});

    if(validation.error){
        res.status(422).send("Email ou senha inválidos!");
        return;
    }
    
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

    const validation = registrationSchema.validate(user, {abortEarly: true});

    if(validation.error){
        return res.status(422).send("Email ou senha inválidos!");  
    }
    try{
    
        const passwordHash=bcrypt.hashSync(user.password,11);
        const userExist = await db.collection("users").findOne({ email: user.email});

        if(userExist){
            return res.status(409).send("Email já utilizado!")
        }

        if(user.password !== user.confirmPassword){
            return res.status(409).send("Erro ao confirmar a senha!")
        }

        delete user.password;
        delete user.confirmPassword;

        await db.collection("users").insertOne({... user, password: passwordHash})

        return res.status(200).send("Registro com sucesso");
    }
    catch( error){
        return res.status(500).send("Erro no registro");
    }
}