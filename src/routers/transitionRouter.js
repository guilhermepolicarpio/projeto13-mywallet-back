import {Router} from "express";
import { credit,debit } from "../controllers/transitionController.js";

const routerTransition = Router()

routerTransition.post("/credit", credit);
routerTransition.post("/debit", debit);


export default routerTransition;