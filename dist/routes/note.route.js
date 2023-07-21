import { Router } from "express";
import verifyToken from "../middleware/verifyToken.js";
import Note from "../models/note.model.js";
import getOrSetCache from "../utils/cacheUtils.js";
import Logger from "../logger.js";
const router = Router();
const logger = Logger.getInstance();
router.post("/create-note", verifyToken, async (req, res) => {
    const { type, title, content } = req.body;
    const userId = req.userId;
    try {
        const note = await Note.create({ title, content, userId, type });
        res.status(201).json(note);
    }
    catch (error) {
        logger.error("Error creating note:", error);
        res.status(501).json({ error: "Failed to create Note" });
    }
});
router.get("/get-all-notes", verifyToken, async (req, res) => {
    const userId = req.userId;
    const cacheKey = `notes:${userId}`;
    try {
        const allNotes = await getOrSetCache(cacheKey, async () => {
            try {
                const notesFromDB = await Note.findAll({
                    where: { userId },
                });
                return notesFromDB;
            }
            catch (error) {
                logger.error("Error fetching notes:", error);
                throw new Error("Failed to fetch notes from the database.");
            }
        });
        res.status(200).json(allNotes);
    }
    catch (error) {
        logger.error("Error:", error);
        res.status(500).json({ error: "Failed to fetch notes." });
    }
});
router.get("/get-note/:id", verifyToken, async (req, res) => {
    const userId = req.userId;
    const noteId = parseInt(req.params.id);
    const cacheKey = `note:${noteId}:${userId}`;
    try {
        const note = await getOrSetCache(cacheKey, async () => {
            const fetchedNote = await Note.findOne({ where: { id: noteId, userId } });
            if (!fetchedNote) {
                return null;
            }
            return fetchedNote;
        });
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }
        res.status(200).json(note);
    }
    catch (error) {
        logger.error("Error:", error);
        res.status(500).json({ error: "Failed to fetch note." });
    }
});
router.put("/update-note/:id", verifyToken, async (req, res) => {
    const userId = req.userId;
    const noteId = parseInt(req.params.id);
    const { title, content, type } = req.body;
    try {
        const note = await Note.findOne({
            where: { id: noteId, userId },
        });
        if (!note) {
            return res.status(404).json({ error: "Note not found." });
        }
        if (title !== undefined) {
            note.title = title;
        }
        if (content !== undefined) {
            note.content = content;
        }
        if (type !== undefined) {
            note.type = type;
        }
        await note.save();
        res.status(200).json(note);
    }
    catch (error) {
        logger.error("Error updating note: ", error);
        res.status(500).json({ error: "Failed to update Note" });
    }
});
router.delete("/delete-note/:id", verifyToken, async (req, res) => {
    const userId = req.userId;
    const noteId = parseInt(req.params.id);
    try {
        const note = await Note.findOne({ where: { id: noteId, userId } });
        if (!note) {
            return res.status(404).json({ error: "Note not found." });
        }
        await note.destroy();
        res.status(200).json({ message: "Note deleted successfully." });
    }
    catch (error) {
        logger.error("Error deleting the note:", error);
        res.status(500).json({ error: "Failed to delete the note." });
    }
});
export default router;
//# sourceMappingURL=note.route.js.map