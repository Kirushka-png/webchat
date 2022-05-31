import Sequelize from "sequelize";

export const sequelize = new Sequelize(
    'webchat',
    'defaultUser',
    '12345', {
        host: "LAPTOP-8J2AIRNH",
        dialect: 'mssql',
        dialectOptions: {
            options: {
                trustServerCertificate: true,
                trustedConnection: false,
                enableArithAbort: true,
                instancename: "SQLEXPRESS"
            }
        }
    }
)

sequelize
    .authenticate()
    .then(() => console.log('Connected.'))
    .catch((err) => console.error('Connection error: ', err))














//   export const config = {
//     user: 'defaultUser',
//     password: '12345',
//     server: "DESKTOP-T9387QK",
//     database: 'appmdp',
//     options: {
//         trustServerCertificate: true,
//         trustedConnection: false,
//         enableArithAbort: true,
//         instancename: "SQLEXPRESS"
//     },
//     port: 1433
// };
// const config = {
//     user: 'QWERTY',
//     password: 'foo',
//     server: "DESKTOP-T9387QK",
//     database: 'Курсовая',
//     options: {
//         trustServerCertificate: true,
//         trustedConnection: false,
//         enableArithAbort: true,
//         instancename: "SQLEXPRESS01"
//     },
//     port: 1433
// };