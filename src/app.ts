import express from "express";
import dotenv from "dotenv";
import { syncDatabase } from "./database.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

syncDatabase().then(() => {
  app.listen(process.env.PORT, () =>
    console.log(`Server is running on port ${process.env.PORT}`)
  );
});
