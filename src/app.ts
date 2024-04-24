import express from "express";
import dotenv from "dotenv";

dotenv.config();

import { syncDatabase } from "./database.js";
import userRoute from "./routes/user.route.js";
import noteRoute from "./routes/note.route.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", userRoute);
app.use("/notes", noteRoute);

syncDatabase().then(() => {
    app.listen(process.env.PORT, () =>
        console.log(`Server is running on port: ${process.env.PORT}`)
    );
});
