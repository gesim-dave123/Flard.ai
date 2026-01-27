import express from "express";
import { registerUser, displayUserbyId } from "../controllers/users.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/:id", displayUserbyId);


export default router;