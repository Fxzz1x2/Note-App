import { Router } from "express";
import verifyToken from "../middleware/verifyToken.js";
import Note from "../models/note.model.js";
const router = Router();
router.post("/create-note", verifyToken, async (req, res) => {
    const { title, content } = req.body;
    const userId = req.userId;
    try {
        const note = await Note.create({ title, content, userId });
        res.status(201).json(note);
    }
    catch (error) {
        console.error("Error creating note:", error);
        res.status(501).json({ error: "Failed to create Note" });
    }
});
export default router;
//# sourceMappingURL=note.route.js.map