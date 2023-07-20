import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database.js";
class User extends Model {
}
User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, { sequelize, modelName: "user", timestamps: false });
export default User;
//# sourceMappingURL=user.model.js.map