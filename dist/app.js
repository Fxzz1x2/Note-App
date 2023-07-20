import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { syncDatabase } from "./database.js";
import userRoute from "./routes/user.route.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/users", userRoute);
syncDatabase().then(() => {
    app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));
});
//# sourceMappingURL=app.js.map