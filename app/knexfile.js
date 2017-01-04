// Update with your config settings.

module.exports = {

    development: {
        client: 'mysql',
        connection: {
            host: process.env.MYSQL_HOST,
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

};
