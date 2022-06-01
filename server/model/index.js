import { Sequelize } from 'sequelize'
import { chatModel } from './chat.model.js'
import { fileModel } from './file.model.js'
import { messageModel } from './message.model.js'
import { chatUserModel } from './relationModels/Chat-Users.model.js'
import { tokenModel } from './token.model.js'
import { userModel } from './user.model.js'

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
db.models.tokenModel = tokenModel(sequelize, Sequelize.DataTypes)
db.models.chatModel = chatModel(sequelize, Sequelize.DataTypes)
db.models.messageModel = messageModel(sequelize, Sequelize.DataTypes)
db.models.chatUserModel = chatUserModel(sequelize, Sequelize.DataTypes)
db.models.fileModel = fileModel(sequelize, Sequelize.DataTypes)