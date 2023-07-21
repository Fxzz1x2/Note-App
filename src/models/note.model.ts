import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database.js";
import User from "./user.model.js";
import Logger from "../logger.js";

const logger = Logger.getInstance();

interface NoteAttributes {
  id: number;
  title: string;
  content: string;
  userId: number;
  type: string;
}

class Note extends Model<NoteAttributes> implements NoteAttributes {
  public id!: number;
  public title!: string;
  public content!: string;
  public userId!: number;
  public type!: string;

  static createNote(
    type: string,
    title: string,
    content: string,
    userId: number
  ): Note {
    const note = Note.build({ title, content, userId, type });

    if (type === "personal") {
      return new PersonalNote(note);
    } else if (type === "work") {
      return new WorkNote(note);
    } else {
      throw new Error("Invalid note type.");
    }
  }
}

class PersonalNote extends Note {
  constructor(note: NoteAttributes) {
    super();
    Object.assign(this, note);
    logger.log("Created Personal Note");
  }
}

class WorkNote extends Note {
  constructor(note: NoteAttributes) {
    super();
    Object.assign(this, note);
    logger.log("Created Work Note");
  }
}

Note.init(
  {
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
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  { sequelize, modelName: "note" }
);

User.hasMany(Note, { foreignKey: "userId" });
Note.belongsTo(User, { foreignKey: "userId" });

export default Note;
