export const tokenModel = (sequelize, DataTypes) => {
    const Token = sequelize.define('token', {
        userID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        refreshToken: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        tableName: 'Tokens'
    })

    return Token
}