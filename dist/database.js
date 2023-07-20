import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: "mysql",
    dialect: process.env.DB_DIALECT,
    port: 3306,
});
async function syncDatabase() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
        await sequelize.sync();
        console.log("Models synchronized with the database.");
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}
export { syncDatabase, sequelize };
//# sourceMappingURL=database.js.map