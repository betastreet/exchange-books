const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        charset: 'utf8'
    }
});

const bookshelf = require('bookshelf')(knex);

bookshelf.plugin(require('bookshelf-prefixed-ordered-uuid'));
bookshelf.plugin(require('bookshelf-paranoia'));
bookshelf.plugin('pagination');
bookshelf.plugin('bookshelf-signals');

module.exports = bookshelf;
