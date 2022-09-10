import {Router} from "express";
import { signUp} from "../controllers/userController.js"
import express from "express"

const router = Router()

router.post("/sign-up", signUp)

export default router;