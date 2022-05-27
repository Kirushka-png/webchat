export const messageModel = (sequelize, DataTypes) => {
    return sequelize.define('Message', {
        chatID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        file: {
            type: DataTypes.STRING
        },
        author: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: false,
        },
        deletedFor: {
            type: DataTypes.STRING
        },
        wasRedacted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: false,
        },
        wasForwarded: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: false,
        }
    }, {
        tableName: 'Messages'
    })
}