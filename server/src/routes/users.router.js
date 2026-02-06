import express from "express";
import multer from "multer";
import {loginUser} from "../controllers/auth.controller.js";
import { registerUser, displayUserbyId } from "../controllers/users.controller.js";
import { processPdfUpload } from "../controllers/flashcard.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id", displayUserbyId);



// routes/user.route.js
const upload = multer({ dest: "uploads/" });
// Frontend should call: /api/users/uploadFile
router.post("/uploadFile", upload.single("file"), processPdfUpload);

export default router;