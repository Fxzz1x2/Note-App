import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database.js";
import User from "./user.model.js";
class Note extends Model {
}
Note.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id",
        },
    },
}, { sequelize, modelName: "note" });
User.hasMany(Note, { foreignKey: "userId" });
Note.belongsTo(User, { foreignKey: "userId" });
export default Note;
//# sourceMappingURL=note.model.js.map