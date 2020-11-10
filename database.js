const mongoose = require('mongoose')

const server = 'localhost'
const databaseName = 'electropiaApi'


class Database {

    constructor() {
        this._connect();
    }

    _connect() {
        //'mongodb+srv://abebe:jX9wpGwlOvp8o7Rl@cluster0.xowdw.mongodb.net/xena_db'
        mongoose.connect(`${process.env.DATABASE_SERVER}/${process.env.DATABASE_NAME}`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(() => {
                console.log('Database connection successful')
            })
            .catch(err => {
                console.error('Database connection error')
            })
    }

}

module.exports = new Database();