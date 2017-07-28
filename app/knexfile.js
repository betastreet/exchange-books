const dotenv = require('dotenv');
const fs = require('fs');
const env = dotenv.parse(fs.readFileSync(`${process.env.NODE_PATH}/../.env`));

module.exports = {

    development: {
        client: 'mysql',
        connection: {
            host: ( env.MYSQL_HOST ? env.MYSQL_HOST : 'database' ),
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            charset: 'utf8'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'migrations',
            directory: './lib/migrations',
        },
        seeds: {
            directory: './lib/seeds',
        },
    },

    production: {
        client: 'mysql',
        connection: {
            host: env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            charset: 'utf8',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'migrations',
            directory: './lib/migrations',
        },
        seeds: {
            directory: './lib/seeds',
        },
    },

};
