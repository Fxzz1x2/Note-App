import { Router } from "express";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
const router = Router();
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });
        res.status(201).json(user);
    }
    catch (err) {
        console.error("Error during regisration:", err);
        res.status(500).json({ error: "Could not create user." });
    }
});
export default router;
//# sourceMappingURL=user.route.js.map