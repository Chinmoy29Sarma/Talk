import { Router } from "express";
import { isAuhenticated } from "../middleware/auth.middleware.js";
import { getMessages, sendMessage } from "../controller/message.controller.js";
const router = Router();

router.post("/send/:receiverId", isAuhenticated, sendMessage);
router.get("/get-messages/:otherParticipantId", isAuhenticated, getMessages);

export default router;
