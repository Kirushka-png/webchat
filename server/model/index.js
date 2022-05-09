import { Sequelize } from 'sequelize'
import { userModel } from './user.model.js'
import { tokenModel } from './token.model.js'
const sequelize = new Sequelize('webchat', 'defaultUser', '12345', {
    host: "DESKTOP-T9387QK",
    dialect: 'mssql',
    dialectOptions: {
        options: {
            encrypt: true,
        }
    }
})

export const db = {}
db.sequelize = sequelize
db.models = {}
db.models.userModel = userModel(sequelize, Sequelize.DataTypes)
db.models.tokenModel = tokenModel(sequelize, Sequelize.DataTypes, userModel)