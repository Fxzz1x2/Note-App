import { Dialect, Sequelize } from "sequelize";
import dotenv from "dotenv";
import Logger from "./logger.js";

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: "mysql",
        dialect: process.env.DB_DIALECT as Dialect,
        port: 3306,
    }
);

async function syncDatabase() {
    const logger = Logger.getInstance();

    try {
        await sequelize.authenticate();
        logger.log("Connection has been established successfully");

        await sequelize.sync();
        logger.log("Models synchronized with the database.");
    } catch (error) {
        logger.error("Unable to connect to the database:", error);
    }
}

export { syncDatabase, sequelize };
