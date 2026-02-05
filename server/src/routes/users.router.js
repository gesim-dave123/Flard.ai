import express from "express";
import {loginUser} from "../controllers/auth.controller.js";
import { registerUser, displayUserbyId } from "../controllers/users.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id", displayUserbyId);


export default router;