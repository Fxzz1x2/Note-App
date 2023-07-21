import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "./models/user.model.js";
import Logger from "./logger.js";

dotenv.config();
const logger = Logger.getInstance();

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const accessToken = generateAccessToken(user.id);

    res.setHeader("Authorization", accessToken);

    res.json({ user });
  } catch (error) {
    logger.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json(user);
  } catch (err) {
    logger.error("Error during registration:", err);
    res.status(500).json({ error: "Could not create user." });
  }
};

export { login, register };
