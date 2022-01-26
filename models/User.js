const { Model, DataTypes } = require("sequelize");
const bcrypt = require('bcryptjs');
const sequelize = require("../config/dbConfig");

class User extends Model {
    // set up method to run on instance data (per user) to check password
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        googleId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        googlePicture: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        hooks: {
            // async beforeCreate(newUserData) {
            //     newUserData.password = await bcrypt.hash(newUserData.password, 10);
            //     return newUserData;
            // },

            // async beforeUpdate(updatedUserData) {
            //     updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            //     return updatedUserData;
            // }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "User",
    }
);

module.exports = User;