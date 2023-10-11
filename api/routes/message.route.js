import express from "express";
import { createMessage, getMessage } from "../controllers/message.cont.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/", verifyToken, createMessage);

router.get("/:id", verifyToken, getMessage);

export default router;
