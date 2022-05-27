export const chatModel = (sequelize, DataTypes) => {
    return sequelize.define('Chat', {
        admin: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        private: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        tableName: 'Chats'
    })
}