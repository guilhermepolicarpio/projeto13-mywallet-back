import {Router} from "express";
import { credit,debit,getTransition } from "../controllers/transitionController.js";
import { validateUser } from "../middlewares/validateUser.js";

const routerTransition = Router()

routerTransition.post("/credit", credit);
routerTransition.post("/debit", debit);
routerTransition.get("/getTransition", validateUser,getTransition);

export default routerTransition;