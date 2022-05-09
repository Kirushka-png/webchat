import config from './connection'
import sql from 'mssql'
import _ from 'lodash'

const getUsersData = async() => {
    try {
        let pool = await sql.connect(config);
        let emploeeys = pool.request().query("select Логин as login, Пароль as password from Заказчики")
        console.log(emploeeys)
        return emploeeys
    } catch (e) {
        console.log(e)
    }
}

module.exports = getUsersData