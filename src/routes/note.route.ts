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
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(501).json({ error: "Failed to create Note" });
  }
});

router.get("/get-all-notes", verifyToken, async (req, res) => {
  const userId = req.userId;

  try {
    const allNotes = await Note.findAll({
      where: { userId },
    });

    res.status(200).json(allNotes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ error: "Failed to fetch notes." });
  }
});

router.get("/get-note/:id", verifyToken, async (req, res) => {
  const userId = req.userId;
  const noteId = parseInt(req.params.id);

  try {
    const note = await Note.findOne({ where: { id: noteId, userId } });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    console.error("Error fetching note:", error);
    res.status(500).json({ error: "Failed to fetch note." });
  }
});

router.put("/update-note/:id", verifyToken, async (req, res) => {
  const userId = req.userId;
  const noteId = parseInt(req.params.id);
  const { title, content } = req.body;

  try {
    const note = await Note.findOne({ where: { id: noteId, userId } });

    if (!note) {
      return res.status(404).json({ error: "Note not found." });
    }

    (note.title = title), (note.content = content);

    await note.save();
    res.status(200).json(note);
  } catch (error) {
    console.error("Error updating note: ", error);
    res.status(50).json({ error: "Failed to update Note" });
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
  } catch (error) {
    console.error("Error deleting the note:", error);
    res.status(500).json({ error: "Failed to delete the note." });
  }
});

export default router;
