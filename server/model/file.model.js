export const fileModel = (sequelize, DataTypes) => {
    return sequelize.define('File', {
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
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        path: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        loader: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }

    }, {
        tableName: 'Files'
    })
}