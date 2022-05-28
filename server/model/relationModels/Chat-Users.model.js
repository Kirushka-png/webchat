export const chatUserModel = (sequelize, DataTypes) => {
    return sequelize.define('ChatUser', {
        chatID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        messagesFrom:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: false,
        }
    }, {
        tableName: 'Chats-Users'
    })
}