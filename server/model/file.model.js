export const fileModel = (sequelize, DataTypes) => {
    return sequelize.define('Chat', {
        originalName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        size: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        path: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        loader: {
            type: DataTypes.STRING,
            allowNull: false,
        }

    }, {
        tableName: 'Files'
    })
}