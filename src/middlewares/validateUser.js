import db from "../db.js"

export async function validateUser(req,res,next){

    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
 
    const session = await db.collection("sessions").findOne({token});

    if(!session){
        console.log("falkha na sessao")
        return res.status(401).send("User not found");
    }
    
    res.locals.session=session;

    next()
}